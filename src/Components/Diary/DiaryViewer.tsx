import React,{useEffect, useRef} from 'react'
import './DiaryEditor.css'
import './DiaryViewer.css'
import hljs from "highlight.js";
import 'highlight.js/styles/vs2015.css'

interface DiaryViewerProps{
  diary:string
  enabled:boolean
  setSelectedDiary
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
    <div className={`diaryViewer ${props.enabled && 'enabled'}`} onClick={()=>props.setSelectedDiary(-1)}>
      <div ref={previewRef} className="diaryPreview" dangerouslySetInnerHTML={{__html:props.diary}} onClick={(e)=>e.stopPropagation()}>
          
      </div>      
    </div>
  )
}

export default DiaryViewer