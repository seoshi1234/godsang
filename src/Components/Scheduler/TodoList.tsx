import { AddIcon } from '@chakra-ui/icons';
import { BsThreeDots } from 'react-icons/bs';
import { Heading, Box, Button } from '@chakra-ui/react';
import moment from 'moment'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { DailyTodos, Schedule, Todo } from '../../Models/ScheduleModel'
import TodoElement from './TodoElement';
import './TodoList.css';
import ScheduleMenu from './ScheduleMenu';
import { ScheduleController } from '../../Controllers/ScheduleController';

interface TodoListProps{
  isScheduleLoaded:boolean,
  schedule:Schedule,
  setSchedule:Dispatch<SetStateAction<Schedule>>
  selectedDate:moment.Moment,
}

function TodoList(props:TodoListProps) {

  const [focusIdx, setFocusIdx] = useState<number>(-1);
  const [selectedSchedule, setSelectedSchedule] = useState<DailyTodos>(null);
  const [toggleScheduleMenu, setToggleScheduleMenu] = useState<boolean>(false);

  const scheduleController = useRef<ScheduleController>(new ScheduleController(props.setSchedule, setSelectedSchedule, setFocusIdx, props.selectedDate));
  const todoElementsRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    scheduleController.current.selectedDate = props.selectedDate;
  },[props.selectedDate])

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

      if(selectedSchedule?.todos?.length > 0){

        if(focusIdx < selectedSchedule.todos.length && focusIdx >= 0){
          const todoElements = todoElementsRef.current.querySelectorAll('.todoList__todo');
          (todoElements[focusIdx].querySelector('input[type="text"]') as HTMLInputElement).focus();
        }
      }
    }

  },[selectedSchedule])


  return (
    <Box className="todoList" width={'container.sm'}>
      
      <Box className='todoList__header' mb={5}>
        <Heading as={'h2'} fontSize='2xl'>{props.selectedDate.format("MM/DD/YYYY 의 일정")}</Heading>
        <Button onClick={()=>setToggleScheduleMenu(!toggleScheduleMenu)} size={'sm'} bgColor={'white'}><BsThreeDots size={'lg'}/></Button>
        <ScheduleMenu         
        closeMenu={()=>setToggleScheduleMenu(false)} 
        toggleMenu={toggleScheduleMenu}
        diary={selectedSchedule?.diary} 
        scheduleController={scheduleController.current}
        setFocusIdx={setFocusIdx}/>
      </Box>

      <div className="todoList__elements" ref={todoElementsRef}>
      {
        selectedSchedule&&
        selectedSchedule.todos?.map((todo,i)=>{
          const sx={
            borderColor:'var(--chakra-colors-facebook-500)',            
          }
          return(            
            <TodoElement key={i} idx={i} todo={todo}
            onFocus={()=>setFocusIdx(i)}
            scheduleController={scheduleController.current}
            />
            
          );
        })
      }
      </div>

      <Button width={'50%'} onClick={()=>scheduleController.current.addTodo()}><AddIcon/>&nbsp;&nbsp;할일 추가하기</Button>

    </Box>
  )
}

export default TodoList