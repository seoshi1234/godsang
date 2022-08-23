import React,{useEffect, useRef} from 'react'
import './DiaryEditor.css'
import hljs from "highlight.js";
import 'highlight.js/styles/vs2015.css'

interface DiaryViewerProps{
  diary:string
}

function DiaryViewer(props:DiaryViewerProps) {

  const previewRef = useRef(null);

  useEffect(()=>{
    previewRef.current.querySelectorAll('pre code').forEach((el) => {
      if(el.classList?.length>0){
        hljs.highlightElement(el as HTMLElement);
      }
    });    
  },[props.diary])

  return (
    <div ref={previewRef} className="diaryPreview" dangerouslySetInnerHTML={{__html:props.diary}}>
        
      </div>
  )
}

export default DiaryViewer