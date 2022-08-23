import React from 'react'
import './Diaries.css'

interface DiaryInfoProps{
  title:string,
  date:string,
  onClick?:React.MouseEventHandler<HTMLDivElement>
}

function DiaryInfo(props:DiaryInfoProps) {
  return (
    <div className="diaryInfo" onClick={props.onClick}>
      <span>{props.date}</span>
      <br/>
      <span>{props.title}</span>
    </div>
  )
}

export default DiaryInfo