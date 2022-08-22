import './DiaryEditor.css'
import hljs from "highlight.js";
import 'highlight.js/styles/vs2015.css'
import React, { useEffect, useRef, useState } from 'react'
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


interface DiaryEditorProps{
  diary:string|null
  onDiaryChange
}

function DiaryEditor(props:DiaryEditorProps) {


  const editorRef = useRef(null);

  const converter = new showdown.Converter({
    'tables':true,
    underline:true,
    strikethrough:true,
  });

  const previewRef = useRef(null);
  
  const [htmlText,setHtmlText] = useState<string>('');

  useEffect(()=>{
    setHtmlText(converter.makeHtml(props.diary));
    
  },[props.diary])

  useEffect(()=>{
    document.querySelectorAll('pre code').forEach((el) => {
      if(el.classList?.length>0){
        hljs.highlightElement(el as HTMLElement);
      }
    });
  },[htmlText])

  const insertAtDiary = (myValue:string, selectOptions?:SelectOption)=>insertAtCursor(editorRef.current, props.onDiaryChange, myValue, selectOptions);

  return (
    <div className="diaryEditor">

      <div className="diaryEditor__toolbar">
        <MdTitle onClick={()=>insertAtDiary('# 제목', {start:2, end:0})}/>
        <MdFormatBold onClick={()=>insertAtDiary('**텍스트**', {start:2, end:2})}/>
        <MdFormatItalic onClick={()=>insertAtDiary('*텍스트*', {start:1, end:1})}/>
        <MdFormatUnderlined onClick={()=>insertAtDiary('__텍스트__', {start:2, end:2})}/>
        <MdFormatStrikethrough onClick={()=>insertAtDiary('~~텍스트~~', {start:2, end:2})}/>
        <FaListUl onClick={()=>insertAtDiary('* ')}/>
        <FaListOl onClick={()=>insertAtDiary('1. ')}/>
        <MdFormatQuote onClick={()=>insertAtDiary('> ')}/>
        <MdHorizontalRule onClick={()=>insertAtDiary('\n\n---')}/>
        <BsCode strokeWidth={'.4px'} onClick={()=>insertAtDiary('\`single line code\`', {start:1,end:1})}/>
        <BsCodeSlash strokeWidth={'.4px'} onClick={()=>insertAtDiary('\n\`\`\`lang-name\nmultiple\nline\ncode\n\`\`\`', {start:14, end:4})}/>
        <ImTable/>
        <MdImage/>
        <MdLink/>

      </div>
      <div className="diaryEditor__headers">
        <Heading as={'h3'}>마크다운 에디터</Heading>
        <Heading as={'h3'}>뷰어</Heading>
      </div>
      <textarea ref={editorRef} value={props.diary} onChange={(e)=>{props.onDiaryChange(e.target.value)}}/>
      <div ref={previewRef} className="diaryPreview" dangerouslySetInnerHTML={{__html:htmlText}}>
        
      </div>
    </div>
  )
}

export default DiaryEditor