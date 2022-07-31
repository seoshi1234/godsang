import React,{useState} from 'react'
import {Box,Button,Checkbox,Input} from '@chakra-ui/react'
import {BsThreeDots} from "react-icons/bs";
import { Todo } from '../Models/Model'
import TodoMenu from './TodoMenu';


interface TodoProps{
  idx:number,
  todo:Todo,
  onCompletedCheck,
  onNameChange
}

function TodoElement(props:TodoProps) {

  const [toggleMenu,setToggleMenu] = useState<boolean>(false);

  return (
    <Box className="todoList__todo" mb={3}>
      <Checkbox isChecked={props.todo.completed} onChange={(e)=>props.onCompletedCheck(e.target.checked,props.idx)} size={'lg'} colorScheme='facebook' mr={3}/>
      <Input mr={3} value={props.todo.name} onChange={(e)=>props.onNameChange(e.target.value,props.idx)} size={'sm'} colorScheme='facebook'/>
      <Button onClick={()=>setToggleMenu(!toggleMenu)} size={'sm'} bgColor={'white'}><BsThreeDots size={'lg'}/></Button>
      <TodoMenu closeMenu={()=>setToggleMenu(false)} toggleMenu={toggleMenu}/>

    </Box>
  )
}

export default TodoElement