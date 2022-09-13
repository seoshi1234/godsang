import React,{useRef, useState} from 'react'
import {Box,Button,Checkbox,Input} from '@chakra-ui/react'
import {BsThreeDots} from "react-icons/bs";
import { Todo } from '../../Models/Model'
import TodoMenu from './TodoMenu';
import moment from 'moment'


interface TodoProps{
  onFocus,
  idx:number,
  todo:Todo,    
  onCompletedCheck,
  onNameChange,
  onTimerChange,
  deleteTimer,
  insertTodo,
  copyTodo,
  pasteTodo,
  deleteTodo,
  moveTodo,
}

function TodoElement(props:TodoProps) {

  const [toggleMenu,setToggleMenu] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (event:React.KeyboardEvent)=>{
    
    if(event.key==="Delete"){
      props.deleteTodo(props.idx);
    }

    if(event.key==="Enter"){
      props.insertTodo(props.idx);

    }
  }

  const handleCopy=(event)=>{
    event.preventDefault();
    props.copyTodo(props.idx);
  }

  const handlePaste=(event)=>{
    event.preventDefault();
    props.pasteTodo(props.idx);
  }

  return (
    <div ref={wrapperRef}>      
      {props.todo.timer && <Box>{props.todo.timer}&nbsp;</Box>}
      <Box className="todoList__todo" mb={3} onKeyDown={handleKeyDown}>
      
        <Checkbox isChecked={props.todo.completed} onChange={(e)=>props.onCompletedCheck(e.target.checked,props.idx)} size={'lg'} colorScheme='facebook' mr={3}/>
        <Input type={'text'} onCopy={handleCopy} onPaste={handlePaste} mr={3} value={props.todo.name} 
        onChange={(e)=>props.onNameChange(e.target.value,props.idx)} onFocus={props.onFocus}
        size={'sm'} colorScheme='facebook'/>
        <Button id='openTodoMenu' onClick={()=>setToggleMenu(!toggleMenu)} size={'sm'} bgColor={'white'}><BsThreeDots size={'lg'}/></Button>
        <TodoMenu        
        idx={props.idx}
        timer={props.todo.timer}
        onTimerChange={props.onTimerChange}
        deleteTimer={props.deleteTimer}
        closeMenu={()=>setToggleMenu(false)}
        toggleMenu={toggleMenu}
        copyTodo={props.copyTodo}
        pasteTodo={props.pasteTodo}
        deleteTodo={props.deleteTodo}
        moveTodo={(direction)=>{
          props.moveTodo(props.idx,direction);
          switch(direction){
            case 'up':
              const prevButton:HTMLElement = wrapperRef.current.previousSibling as HTMLElement;
              if(prevButton != null) setToggleMenu(false);
              (prevButton.querySelector('#openTodoMenu') as HTMLButtonElement).click();
              (prevButton.querySelector('#openMoveMenu') as HTMLButtonElement).click();
              break;
            case 'down':
              const nextButton:HTMLElement = wrapperRef.current.nextSibling as HTMLElement;
              if(nextButton != null) setToggleMenu(false);
              (nextButton.querySelector('#openTodoMenu') as HTMLButtonElement).click();
              (nextButton.querySelector('#openMoveMenu') as HTMLButtonElement).click();
              break;
            default:
              setToggleMenu(false);
              break;
          }
        }}
        />
      </Box>
    </div>
  )
}

export default TodoElement