import './DiaryEditor.css'
import hljs from "highlight.js";
import 'highlight.js/styles/vs2015.css'
import React, { useEffect, useRef, useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage"
import 
{
Heading,
IconButton
} from '@chakra-ui/react'
import {
  MdTitle,
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdFormatQuote,  
  MdHorizontalRule,
  MdTableChart,
  MdImage,
  MdLink,    
} from 'react-icons/md'
import{
  FaListOl,
  FaListUl,  
} from 'react-icons/fa'
import{
  ImTable
} from 'react-icons/im'
import showdown from 'showdown';
import { insertAtCursor, SelectOption } from '../Functions';
import { BsCode, BsCodeSlash, BsFileCode } from 'react-icons/bs';
import AlertModal from './AlertModal';
import { getAuth } from 'firebase/auth';
import { bitlyToken } from '../firebaseConfig';


interface DiaryEditorProps{
  diary:string|null
  onDiaryChange
}

function DiaryEditor(props:DiaryEditorProps) {


  const editorRef = useRef(null);
  const previewRef = useRef(null);
  const fileInputRef = useRef(null);

  const converter = new showdown.Converter({
    'tables':true,
    underline:true,
    strikethrough:true,
  });

  const auth = getAuth();
  const storage = getStorage();
  

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [htmlText,setHtmlText] = useState<string>('');

  useEffect(()=>{
    const diaryEditorText = props.diary?.replace(/<\/?p[^>]*>/g, '');
    setHtmlText(converter.makeHtml(diaryEditorText));
    
  },[props.diary])

  useEffect(()=>{
    previewRef.current.querySelectorAll('pre code').forEach((el) => {
      if(el.classList?.length>0){
        hljs.highlightElement(el as HTMLElement);
      }
    });    
  },[htmlText])

  const insertAtDiary = (myValue:string, selectOptions?:SelectOption)=>insertAtCursor(editorRef.current, props.onDiaryChange, myValue, selectOptions);
  
  const uploadImage = async (file:File)=>{

    const time = Date.now().toString();
    const fileNameRef = ref(storage, `${auth.currentUser.uid}/diaryImages/${time+file.name}`);
    await uploadBytes(fileNameRef, file);
    const url = await getDownloadURL(fileNameRef);
    
    ///shorten url
    const response = await fetch('https://api-ssl.bitly.com/v4/shorten', {      
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${bitlyToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "long_url": url, "domain": "bit.ly"})
    });

    if(response.ok){
      const json = await response.json()
      insertAtDiary(`\n![image-name](${json.link})`);
    }else{
      insertAtDiary(`\n![image-name](${url})`);
    }
  }

  const handleFileInput= async (e:React.ChangeEvent<HTMLInputElement>)=>{
    
    setIsUploading(true);
    const files = e.target.files;
    const filesArray = [];

    for(let i = 0; i < files.length; i++){
      filesArray.push(files[i]);
    }
    
    await Promise.all(filesArray.map((file)=>{
      return uploadImage(file);
    }))

    setIsUploading(false);
  }

  


  return (
    <div className="diaryEditor">

      <div className="diaryEditor__toolbar">
        <MdTitle onClick={()=>insertAtDiary('# 제목', {start:2, end:0})} title='제목'/>
        <MdFormatBold onClick={()=>insertAtDiary('**텍스트**', {start:2, end:2})} title='Bold'/>
        <MdFormatItalic onClick={()=>insertAtDiary('*텍스트*', {start:1, end:1})} title='Italic'/>
        <MdFormatUnderlined onClick={()=>insertAtDiary('__텍스트__', {start:2, end:2})} title='밑줄'/>
        <MdFormatStrikethrough onClick={()=>insertAtDiary('~~텍스트~~', {start:2, end:2})} title='취소선'/>
        <FaListUl onClick={()=>insertAtDiary('* ')} title='Unordered List'/>
        <FaListOl onClick={()=>insertAtDiary('1. ')} title='Ordered List'/>
        <MdFormatQuote onClick={()=>insertAtDiary('> ')} title='인용'/>
        <MdHorizontalRule onClick={()=>insertAtDiary('\n\n---')} title='가로선'/>
        <BsCode strokeWidth={'.4px'} onClick={()=>insertAtDiary('\`single line code\`', {start:1,end:1})} title='인라인 코드'/>
        <BsCodeSlash strokeWidth={'.4px'} onClick={()=>insertAtDiary('\n\`\`\`language-name\nmultiple\nline\ncode\n\`\`\`', {start:19, end:4})} title='소스코드'/>
        <ImTable onClick={()=>insertAtDiary('| Head | Head |\n| --- | --- |\n| Data | Data |\n| Data | Data |')} title='차트'/>
        <MdImage onClick={()=>fileInputRef.current.click()} title='이미지'/>
        <MdLink onClick={()=>insertAtDiary('\n[link-name](link-url)', {start:13, end:1})} title='하이퍼링크'/>
        <input ref={fileInputRef} type="file" name="file" id='image-upload' onChange={(e)=>handleFileInput(e)} accept="image/*" style={{display:'none'}} multiple/>
      </div>
      
      <div className="diaryEditor__headers">
        <Heading as={'h3'}>마크다운 에디터</Heading>
        <Heading as={'h3'}>뷰어</Heading>
      </div>

      <textarea ref={editorRef} value={props.diary} onChange={(e)=>{props.onDiaryChange(e.target.value)}}/>
      <div ref={previewRef} className="diaryPreview" dangerouslySetInnerHTML={{__html:htmlText}}>
        
      </div>

      <AlertModal enabled={isUploading}>업로드 중입니다...</AlertModal>
    </div>
  )
}

export default DiaryEditor