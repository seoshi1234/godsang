import { AddIcon } from '@chakra-ui/icons';
import { Heading, Box, Checkbox, Input, StyleObjectOrFn, Button } from '@chakra-ui/react';
import moment from 'moment'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { DailyTodos, Schedule, Todo } from '../Models/Model'
import TodoElement from './TodoElement';
import './TodoList.css';

interface TodoListProps{
  isLoaded:boolean,
  schedule:Schedule,
  setSchedule:Dispatch<SetStateAction<Schedule>>
  selectedDate:moment.Moment,
}

function TodoList(props:TodoListProps) {

  const [selectedSchedule, setSelectedSchedule] = useState<DailyTodos>(null);
  const [todoClipboard, setTodoClipboard] = useState<Todo>(null);

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
    const newSelectedSchedule = {...selectedSchedule};
    newSelectedSchedule.todos.splice(idx+1,0,todoClipboard);
    setSelectedSchedule(newSelectedSchedule);
  }

  const deleteTodo = (idx:number)=>{
    const newSelectedSchedule = {...selectedSchedule};
    newSelectedSchedule.todos.splice(idx,1);
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

  },[props.selectedDate, props.isLoaded])

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
    <Box className="todoList">
      <Heading as={'h2'} mb={5}>{props.selectedDate.format("MM/DD/YYYY 의 일정")}</Heading>
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
            copyTodo={copyTodo}
            pasteTodo={pasteTodo}
            deleteTodo={deleteTodo}/>
            
          );
        })
      }
      
      <Button width={'100%'} onClick={addTodo}><AddIcon/>&nbsp;&nbsp;할일 추가하기</Button>

    </Box>
  )
}

export default TodoList