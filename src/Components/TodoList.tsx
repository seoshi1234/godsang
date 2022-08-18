import { AddIcon } from '@chakra-ui/icons';
import { BsThreeDots } from 'react-icons/bs';
import { Heading, Box, Checkbox, Input, StyleObjectOrFn, Button } from '@chakra-ui/react';
import moment from 'moment'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DailyTodos, Schedule, Todo } from '../Models/Model'
import TodoElement from './TodoElement';
import './TodoList.css';
import ScheduleMenu from './ScheduleMenu';
import {useDebouncedEffect} from '../Hooks'

interface TodoListProps{
  isScheduleLoaded:boolean,
  schedule:Schedule,
  setSchedule:Dispatch<SetStateAction<Schedule>>
  selectedDate:moment.Moment,
}

function TodoList(props:TodoListProps) {

  const [selectedSchedule, setSelectedSchedule] = useState<DailyTodos>(null);
  const [todoClipboard, setTodoClipboard] = useState<Todo>(null);
  const [toggleScheduleMenu, setToggleScheduleMenu] = useState<boolean>(false);

  const onCompletedCheck=(value:boolean, i:number)=>{
    const newSelectedSchedule = {...selectedSchedule};
    newSelectedSchedule.todos[i].completed = value;
    setSelectedSchedule(newSelectedSchedule);
  }

  const onNameChange=(value:string, i:number)=>{    
    const newSelectedSchedule = {...selectedSchedule};
    newSelectedSchedule.todos[i].name = value;
    setSelectedSchedule(newSelectedSchedule);
  }

  const onTimerChange=(value:string, i:number)=>{
    const newSelectedSchedule = {...selectedSchedule};
    newSelectedSchedule.todos[i].timer = value;
    setSelectedSchedule(newSelectedSchedule);
  }

  const onDiaryChange=(value:string|null)=>{

    if(!selectedSchedule){
      const newSelectedSchedule:DailyTodos = {
        date:props.selectedDate.format("YYYY년 M월 D일"),
        todos:[],
        diary:value,
      }
      setSelectedSchedule(newSelectedSchedule);
    }
    else{
      const newSelectedSchedule = {...selectedSchedule};
      newSelectedSchedule.diary=value;
      setSelectedSchedule(newSelectedSchedule);
    }
  }

  const deleteTimer=(i:number)=>{
    const newSelectedSchedule = {...selectedSchedule};
    newSelectedSchedule.todos[i].timer = null;
    setSelectedSchedule(newSelectedSchedule);
  }  

  const addTodo=()=>{

    if(!selectedSchedule){
      const newSelectedSchedule:DailyTodos = {
        date:props.selectedDate.format("YYYY년 M월 D일"),
        todos:[{
          completed:false,
          name:'',
          timer:null          
        }]
      }
      setSelectedSchedule(newSelectedSchedule);
    }
    else{
      const newSelectedSchedule = {...selectedSchedule};
      if(newSelectedSchedule.todos?.length>0){
        newSelectedSchedule.todos.push({
          completed:false,
          name:'',
          timer:null
        })
      }
      else{
        newSelectedSchedule.todos = [{
          completed:false,
          name:'',
          timer:null
        }]
      }
      setSelectedSchedule(newSelectedSchedule);
    }
  }

  const copyTodo = (idx:number)=>{
    setTodoClipboard({...(selectedSchedule.todos[idx])});
  }

  const pasteTodo = (idx:number)=>{
    if(!todoClipboard) return;
    const newSelectedSchedule = {...selectedSchedule};
    newSelectedSchedule.todos.splice(idx+1,0,todoClipboard);
    setSelectedSchedule(newSelectedSchedule);
  }

  const deleteTodo = (idx:number)=>{
    const newSelectedSchedule = {...selectedSchedule};
    newSelectedSchedule.todos.splice(idx,1);
    setSelectedSchedule(newSelectedSchedule);
  }

  const moveTodo = (idx:number, direction:(string & {})
  | "up" | "down" | "back" | "forward")=>{
    const newSelectedSchedule = {...selectedSchedule};
    const todoCopy = {...(selectedSchedule.todos[idx])};
    newSelectedSchedule.todos.splice(idx,1);
    
    const dateToMove = props.selectedDate.clone();
    let scheduleToMove;
    
    switch(direction){
      case 'up':
        idx --;
        if(idx < 0) idx = 0;
        newSelectedSchedule.todos.splice(idx, 0, todoCopy);
        break;
      case 'down':
        idx ++;
        if(idx >= newSelectedSchedule.todos.length) idx = newSelectedSchedule.todos.length;
        newSelectedSchedule.todos.splice(idx, 0, todoCopy);
        break;
      case 'back':
        dateToMove.subtract(1,'days')
        break;
      case 'forward':        
        dateToMove.add(1,'days')            
        break;
    }
    
    if(dateToMove.format('d') !== props.selectedDate.format('d')){
      const newSchedule = {...props.schedule};

      scheduleToMove = props.schedule?.dailySchedules.findIndex((dailyTodo)=>{
        return dailyTodo.date === dateToMove.format("YYYY년 M월 D일");
      })
      
      if(scheduleToMove != -1){
        if(newSchedule.dailySchedules[scheduleToMove].todos){
          newSchedule.dailySchedules[scheduleToMove].todos.push(todoCopy);
        }else{
          newSchedule.dailySchedules[scheduleToMove].todos=[todoCopy];
        }
      }else{
        newSchedule.dailySchedules.push({
          date: dateToMove.format("YYYY년 M월 D일"),
          todos: [todoCopy]
        })
      }

      console.log(newSchedule);
      props.setSchedule(newSchedule);
    }    


    setSelectedSchedule(newSelectedSchedule);

  }

  useEffect(()=>{


    const newSelectedSchedule = props.schedule?.dailySchedules.find((dailyTodo)=>{
      return dailyTodo.date === props.selectedDate.format("YYYY년 M월 D일");
    })

    if(newSelectedSchedule){
      setSelectedSchedule({...newSelectedSchedule});
    }else{
      setSelectedSchedule(null);
    }

  },[props.selectedDate, props.isScheduleLoaded])

  useEffect(()=>{

    if(selectedSchedule){
      const newSchedule = {...props.schedule};
  
      const currentSchedule = newSchedule.dailySchedules.findIndex((dailySchedule)=>dailySchedule.date === props.selectedDate.format("YYYY년 M월 D일"));

      if(currentSchedule != -1){
        newSchedule.dailySchedules[currentSchedule] = selectedSchedule;
      }else{
        newSchedule.dailySchedules.push(selectedSchedule);
      }

      props.setSchedule(newSchedule);
    }



  },[selectedSchedule])


  return (
    <Box className="todoList" width={'container.sm'}>
      <Box className='todoList__header' mb={5}>
        <Heading as={'h2'} fontSize='3xl'>{props.selectedDate.format("MM/DD/YYYY 의 일정")}</Heading>
        <Button onClick={()=>setToggleScheduleMenu(!toggleScheduleMenu)} size={'sm'} bgColor={'white'}><BsThreeDots size={'lg'}/></Button>
        <ScheduleMenu 
        closeMenu={()=>setToggleScheduleMenu(false)} 
        toggleMenu={toggleScheduleMenu}
        diary={selectedSchedule?.diary} 
        deleteDiary={()=>{onDiaryChange(null)}}
        onDiaryChange={onDiaryChange}/>
      </Box>
      {
        selectedSchedule&&
        selectedSchedule.todos?.map((todo,i)=>{
          const sx={
            borderColor:'var(--chakra-colors-facebook-500)',            
          }
          return(            
            <TodoElement key={i} idx={i} todo={todo}             
            onCompletedCheck={onCompletedCheck} 
            onNameChange={onNameChange}
            onTimerChange={onTimerChange}
            deleteTimer={deleteTimer}
            copyTodo={copyTodo}
            pasteTodo={pasteTodo}
            deleteTodo={deleteTodo}
            moveTodo={moveTodo}
            />
            
          );
        })
      }
      
      <Button width={'50%'} onClick={addTodo}><AddIcon/>&nbsp;&nbsp;할일 추가하기</Button>

    </Box>
  )
}

export default TodoList