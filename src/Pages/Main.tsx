import Menu from '../Components/Menu'
import { Auth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import './Main.css'

import moment from 'moment';
import { DailyTodos, Schedule } from '../Models/Model'
import { Database, get, onValue, ref, set } from 'firebase/database'
import Calendar from '../Components/Calendar'
import TodoList from '../Components/TodoList'
import { useInterval } from '../Hooks'



interface MainProps{
  auth:Auth
  db:Database
}

function Main(props : MainProps) {

  moment.locale('ko');

  const [isLoaded,setIsLoaded] = useState<boolean>(false);
  const [selectedDate,setSelectedDate] = useState<moment.Moment>(moment());
  const [schedule, setSchedule] = useState<Schedule>(null);
  const [todaySchedule,setTodaySchedule] = useState<DailyTodos>(null);  
  const [timerInterval, setTimerInterval] = useState<number>(1000);
  const [rerender, setRerender] = useState<boolean>(false);

  useEffect(()=>{
    if(schedule){
      if(isLoaded){
        set(ref(props.db, 'users/'+props.auth.currentUser.uid),schedule);
      }else{
        setIsLoaded(true);
      }
      setTodaySchedule(schedule.dailySchedules.find((dailySchedule)=>{
        return dailySchedule.date === moment().format('YYYY년 M월 D일');
      }))
    }
    
  },[schedule])

  useInterval(()=>{    

    if(todaySchedule){

      setTimerInterval(1000);

      const currentTime = moment().format('HH:mm');

      const activatedAlarms = todaySchedule.todos.filter(todo=>{
        return todo.timer === currentTime;
      })        

      

      if(activatedAlarms?.length>0 && timerInterval===1000){
        activatedAlarms.forEach(alarm=>{
          alert(alarm.name)
        })
        setTimerInterval(1000*(60-Number(moment().format('s'))));
      }
    }
  },timerInterval)

  useEffect(()=>{    

    onValue(ref(props.db, 'users/'+props.auth.currentUser.uid),(snapshot)=>{
      setSchedule(snapshot.val());      
    });
    
  },[])

  return (
    <div className="main">
      <Header/>
      <Calendar schedule={schedule} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <TodoList  schedule={schedule} setSchedule={setSchedule} selectedDate={selectedDate} isLoaded={isLoaded} />
      <Menu signOut={()=>props.auth.signOut()}/>
    </div>
  )
}

export default Main