import React,{useState} from 'react'
import {Box,Button,Checkbox,Input} from '@chakra-ui/react'
import {BsThreeDots} from "react-icons/bs";
import { Todo } from '../Models/Model'
import TodoMenu from './TodoMenu';


interface TodoProps{
  idx:number,
  todo:Todo,
  onCompletedCheck,
  onNameChange,
  onTimerChange,
  copyTodo,
  pasteTodo,
  deleteTodo
}

function TodoElement(props:TodoProps) {

  const [toggleMenu,setToggleMenu] = useState<boolean>(false);

  const handleKeyDown = (event:React.KeyboardEvent)=>{
    
    if(event.key==="Delete"){
      props.deleteTodo(props.idx);
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
    <Box className="todoList__todo" mb={3} onKeyDown={handleKeyDown}>
      <Checkbox isChecked={props.todo.completed} onChange={(e)=>props.onCompletedCheck(e.target.checked,props.idx)} size={'lg'} colorScheme='facebook' mr={3}/>
      <Input onCopy={handleCopy} onPaste={handlePaste} mr={3} value={props.todo.name} onChange={(e)=>props.onNameChange(e.target.value,props.idx)} size={'sm'} colorScheme='facebook'/>
      <Button onClick={()=>setToggleMenu(!toggleMenu)} size={'sm'} bgColor={'white'}><BsThreeDots size={'lg'}/></Button>
      <TodoMenu
      idx={props.idx} 
      timer={props.todo.timer}
      onTimerChange={props.onTimerChange}
      closeMenu={()=>setToggleMenu(false)} 
      toggleMenu={toggleMenu}
      copyTodo={props.copyTodo}
      pasteTodo={props.pasteTodo}
      deleteTodo={props.deleteTodo}/>
    </Box>
  )
}

export default TodoElement