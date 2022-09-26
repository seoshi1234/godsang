import React,{useRef, useState} from 'react'
import {Box,Button,Checkbox,Input} from '@chakra-ui/react'
import {BsThreeDots} from "react-icons/bs";
import { Todo } from '../../Models/ScheduleModel'
import TodoMenu from './TodoMenu';
import { ScheduleController } from '../../Controllers/ScheduleController';


interface TodoProps{
  onFocus,
  idx:number,
  todo:Todo,    
  scheduleController:ScheduleController,
}

function TodoElement(props:TodoProps) {

  const [toggleMenu,setToggleMenu] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event:React.KeyboardEvent)=>{
    
    if(event.key==="Delete"){
      props.scheduleController.deleteTodo(props.idx);
    }

    if(event.key==="Enter"){
      props.scheduleController.insertTodo(props.idx);

    }
  }

  const handleCopy=(event)=>{
    event.preventDefault();
    props.scheduleController.copyTodo(props.idx);
  }

  const handlePaste=(event)=>{
    event.preventDefault();
    props.scheduleController.pasteTodo(props.idx);
  }

  return (
    <div ref={wrapperRef}>      
      {props.todo.timer && <Box>{props.todo.timer}&nbsp;</Box>}
      <Box className="todoList__todo" mb={3} onKeyDown={handleKeyDown}>
      
        <Checkbox isChecked={props.todo.completed} onChange={(e)=>props.scheduleController.onCompletedCheck(e.target.checked,props.idx)} size={'lg'} colorScheme='facebook' mr={3}/>
        <Input type={'text'} onCopy={handleCopy} onPaste={handlePaste} mr={3} defaultValue={props.todo.name} 
        onChange={(e)=>props.scheduleController.onNameChange(e.target.value,props.idx)} onFocus={props.onFocus}
        size={'sm'} colorScheme='facebook'/>
        <Button id='openTodoMenu' onClick={()=>setToggleMenu(!toggleMenu)} size={'sm'} bgColor={'white'}><BsThreeDots size={'lg'}/></Button>
        <TodoMenu        
        idx={props.idx}
        timer={props.todo.timer}
        closeMenu={()=>setToggleMenu(false)}
        toggleMenu={toggleMenu}
        scheduleController={props.scheduleController}
        />
      </Box>
    </div>
  )
}

export default TodoElement