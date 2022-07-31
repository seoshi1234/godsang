import Menu from '../Components/Menu'
import { Auth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import './Main.css'

import moment from 'moment';
import { Schedule } from '../Models/Model'
import { Database, get, onValue, ref, set } from 'firebase/database'
import Calendar from '../Components/Calendar'
import TodoList from '../Components/TodoList'



interface MainProps{
  auth:Auth
  db:Database
}

function Main(props : MainProps) {

  moment.locale('ko');

  const [isLoaded,setIsLoaded] = useState<boolean>(false);
  const [selectedDate,setSelectedDate] = useState<moment.Moment>(moment());
  const [schedule, setSchedule] = useState<Schedule>(null);
  const [rerender, setRerender] = useState<boolean>(false);

  useEffect(()=>{
    if(schedule){
      if(isLoaded){
        set(ref(props.db, 'users/'+props.auth.currentUser.uid),schedule);
      }else{
        setIsLoaded(true);
      }
    }
    
  },[schedule])

  useEffect(()=>{    

    onValue(ref(props.db, 'users/'+props.auth.currentUser.uid),(snapshot)=>{
      setSchedule(snapshot.val());      
    });
    
  },[])
 
  return (
    <div className="main">
      <Header/>
      <Menu signOut={()=>props.auth.signOut()}/>
      <Calendar schedule={schedule} selectedDate={selectedDate} setSelectedDate={setSelectedDate}/>
      <TodoList  schedule={schedule} setSchedule={setSchedule} selectedDate={selectedDate} isLoaded={isLoaded} />
    </div>
  )
}

export default Main