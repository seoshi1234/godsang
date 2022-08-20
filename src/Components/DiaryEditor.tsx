import './DiaryEditor.css'
import hljs from "highlight.js";
import 'highlight.js/styles/vs2015.css'
import React, { useEffect, useRef, useState } from 'react'
import 
{
Button,
Box,
Input,
Textarea,
Text
} from '@chakra-ui/react'
import showdown from 'showdown';


interface DiaryEditorProps{
  diary:string|null
  onDiaryChange
}

function DiaryEditor(props:DiaryEditorProps) {


  
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
      hljs.highlightElement(el as HTMLElement);
    });
  },[htmlText])



  return (
    <div className="diaryEditor">


      <textarea value={props.diary} onChange={(e)=>{props.onDiaryChange(e.target.value)}}/>

      <div ref={previewRef} className="diaryPreview" dangerouslySetInnerHTML={{__html:htmlText}}>
        
      </div>
    </div>
  )
}

export default DiaryEditor