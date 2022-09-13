import React, { useEffect, useState } from 'react'
import { Diary, Schedule } from '../../Models/Model'
import DiaryViewer from './DiaryViewer';
import showdown from 'showdown';
import DiaryInfo from './DiaryInfo';
import './Diaries.css'
import moment from 'moment';
import { Box, Button, Divider, Heading } from '@chakra-ui/react';
import {ChevronUpIcon, ChevronDownIcon} from '@chakra-ui/icons'

interface DiariesProps{
  schedule:Schedule
}

function Diaries(props:DiariesProps) {

  const dateRegExp = /(\d+)년 (\d+)월 (\d+)일/g;

  const converter = new showdown.Converter({
    'tables':true,
    underline:true,
    strikethrough:true,
  });

  const [selectedMonth,setSelectedMonth] = useState<moment.Moment>(moment());
  const [diaries, setDiaries]=useState<Array<Diary>>(null);  
  const [selectedDiary, setSelectedDiary] = useState<number>(-1);

  const increaseMonth = ()=>{
    const currentMonth = moment(selectedMonth).format("M");
    const currentYear = moment(selectedMonth).format("YYYY");

    if(currentMonth === '12'){
      const nextYear = moment(selectedMonth).year(Number(currentYear)+1);
      setSelectedMonth(moment(nextYear).month(0));
    }else{
      setSelectedMonth(moment(selectedMonth).month(Number(currentMonth)));
    }
  }

  const decreaseMonth = ()=>{
    const currentMonth = moment(selectedMonth).format("M");
    const currentYear = moment(selectedMonth).format("YYYY");

    if(currentMonth === '1'){
      const prevYear = moment(selectedMonth).year(Number(currentYear)-1);
      setSelectedMonth(moment(prevYear).month(11));
    }else{
      setSelectedMonth(moment(selectedMonth).month(Number(currentMonth)-2));
    }
  }

  useEffect(()=>{
    if(!props.schedule) return;
    const diariesArr = [];
    props.schedule.dailySchedules.forEach((dailySchedule)=>{
      if(dailySchedule.diary?.length > 0){
        
        const monthMatch = dailySchedule.date.split(/년 |월 |일/g)[1];
        
        if(monthMatch !== selectedMonth.format("M")) return;

        const toHtmlText = converter.makeHtml(dailySchedule.diary);
        const toHtml = new DOMParser().parseFromString(toHtmlText,'text/html');
        const titleMatch:Element = toHtml.querySelector('h1, h2, h3, h4, h5, h6');
        
        const diaryInfo:Diary = {
          date:dailySchedule.date,
          title: titleMatch ? titleMatch.innerHTML : '# 제목을 입력하세요',
          value:toHtmlText
        }
        diariesArr.push(diaryInfo);
      }
    })
    setDiaries(diariesArr);

  },[props.schedule, selectedMonth])

  return (
    <div className="diaries">
      <div className="diaries__upper">
        <div className="diaries__header">
          <Heading as={'h1'} fontSize='xl' color={'#555'}>{selectedMonth.format("Y년 M월의 기록")}</Heading>
          <Box className='diaries__navigationBtns' ml={2}>
            <Button onClick={decreaseMonth}><ChevronUpIcon/></Button>
            <Button onClick={increaseMonth} ml={2}><ChevronDownIcon/></Button> 
          </Box>
        </div>
        <Divider height={'10px'} borderBottomWidth='2px' borderColor={'#555'}/>
      </div>
      {
        diaries?.length>0 ?
        diaries.map((diary,i)=>{          
          if(diary)
            return <DiaryInfo date={diary.date} title={diary.title} onClick={()=>setSelectedDiary(i)} key={i}/>
        })
        :
        <Box margin={'40px auto'} textAlign='center' fontSize={'2xl'} color='#555'>{'기록된 일기가 없어요 :('}</Box>
      }

      <DiaryViewer 
      enabled={selectedDiary !== -1}
      diary={selectedDiary === -1 ? "" : diaries[selectedDiary].value}
      setSelectedDiary={setSelectedDiary}></DiaryViewer>
    </div>
  )
}

export default Diaries