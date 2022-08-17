import Menu from '../Components/Menu'
import { Auth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import './Main.css'

import moment from 'moment';
import { DailyTodos, Schedule, StampBoard } from '../Models/Model'
import { Database, get, onValue, ref, set } from 'firebase/database'
import Calendar from '../Components/Calendar'
import TodoList from '../Components/TodoList'
import { useInterval } from '../Hooks'
import {randomNotification} from '../Notification'
import _StampBoard from '../Components/StampBoard'


interface MainProps{
  auth:Auth
  db:Database
}

function Main(props : MainProps) {

  moment.locale('ko');

  const [mainPageState, setMainPageState] = useState<'schedule'|'stamp'>('schedule');

  const [isScheduleLoaded,setIsScheduleLoaded] = useState<boolean>(false);
  const [isStampBoardLoaded,setIsStampBoardLoaded] = useState<boolean>(false);

  const [selectedDate,setSelectedDate] = useState<moment.Moment>(moment());
  const [schedule, setSchedule] = useState<Schedule>(null);
  const [stampBoard, setStampBoard] = useState<StampBoard>(null);
  const [todaySchedule,setTodaySchedule] = useState<DailyTodos>(null);  

  const [timerInterval, setTimerInterval] = useState<number>(1000);  

  useEffect(()=>{
    if(schedule){
      if(isScheduleLoaded){
        set(ref(props.db, `users/${props.auth.currentUser.uid}/schedule`),schedule);
      }else{
        setIsScheduleLoaded(true);
      }
      setTodaySchedule(schedule.dailySchedules.find((dailySchedule)=>{
        return dailySchedule.date === moment().format('YYYY년 M월 D일');
      }))
    }
    
  },[schedule])

  useEffect(()=>{
    if(stampBoard){
      if(isStampBoardLoaded){
        set(ref(props.db, `users/${props.auth.currentUser.uid}/stampBoard`),stampBoard);
      }else{
        setIsStampBoardLoaded(true);
      }
      
    }
    
  },[stampBoard])

  useInterval(()=>{    

    if(todaySchedule){

      setTimerInterval(1000);

      const currentTime = moment().format('HH:mm');

      const activatedAlarms = todaySchedule.todos.filter(todo=>{
        return todo.timer === currentTime;
      })        

      

      if(activatedAlarms?.length>0 && timerInterval===1000){
        activatedAlarms.forEach(alarm=>{
          var notification = new Notification('일정 알림', {
            icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
            body: alarm.name,
          });          
        })
        setTimerInterval(1000*(60-Number(moment().format('s'))));
      }
    }
  },timerInterval)

  useEffect(()=>{    

    onValue(ref(props.db, 'users/'+props.auth.currentUser.uid),(snapshot)=>{
      setSchedule(snapshot.val().schedule);   
      setStampBoard(snapshot.val().stampBoard);
    });

    Notification.requestPermission();
    
    
    
  },[])

  return (
    <div className="main">
      <Header/>
      {
        {
          'schedule': 
          <>
            <Calendar schedule={schedule} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
            <TodoList  schedule={schedule} setSchedule={setSchedule} selectedDate={selectedDate} isScheduleLoaded={isScheduleLoaded} />
          </>,
          'stamp': 
          <>
            <_StampBoard stampBoard={stampBoard} setStampBoard={setStampBoard}/>
          </>
        }[mainPageState]
      }
      
      <Menu mainPageState={mainPageState} setMainPageState={setMainPageState} signOut={()=>props.auth.signOut()}/>
    </div>
  )
}

export default Main