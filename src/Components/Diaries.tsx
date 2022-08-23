import React, { useEffect, useState } from 'react'
import { Diary, Schedule } from '../Models/Model'
import DiaryViewer from './DiaryViewer';
import showdown from 'showdown';

interface DiariesProps{
  schedule:Schedule
}

function Diaries(props:DiariesProps) {

  const converter = new showdown.Converter({
    'tables':true,
    underline:true,
    strikethrough:true,
  });
  const [diaries, setDiaries]=useState<Array<Diary>>(null);

  useEffect(()=>{
    if(!props.schedule) return;
    setDiaries(
      props.schedule.dailySchedules.map((dailySchedule)=>{
      if(dailySchedule.diary?.length > 0){

        const toHtmlText = converter.makeHtml(dailySchedule.diary);
        const toHtml = new DOMParser().parseFromString(toHtmlText,'text/html');
        const titleMatch:Element = toHtml.querySelector('h1, h2, h3, h4, h5, h6');

        const returnVal:Diary = {
          date:dailySchedule.date,
          title: titleMatch ? titleMatch.innerHTML : '# 무제',
          value:toHtmlText
        }
        return returnVal;
      }
    }))

  },[props.schedule])

  return (
    <div className="diaries">
      {
        
        diaries?.length>0 ?
        diaries.map((diary,i)=>{
          console.log(diaries)
          if(diary)
            return <DiaryViewer diary={diary.value} key={i}/>
        })
        :
        <p>{'기록된 일기가 없어요 :('}</p>
      }
      
    </div>
  )
}

export default Diaries