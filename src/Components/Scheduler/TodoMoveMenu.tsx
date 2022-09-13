import React,{useRef} from 'react'
import {useClickOutside} from '../../Hooks'
import {
  Box
} from '@chakra-ui/react'
import ButtonWithIcon from '../ButtonWithIcon'
import { ArrowBackIcon, ArrowDownIcon, ArrowForwardIcon, ArrowLeftIcon, ArrowRightIcon, ArrowUpIcon } from '@chakra-ui/icons'

interface TodoMoveMenuProps{
  toggleMenu:boolean
  moveTodo:(direction:(string & {})
  | "up" | "down" | "back" | "forward")=>void
  closeMenu:()=>void

}

function TodoMoveMenu(props:TodoMoveMenuProps) {

  const wrapperRef = useRef(null);

  useClickOutside(()=>{
    props.closeMenu();
  },wrapperRef)

  return (
    <Box onClick={(e)=>{
      if(e.currentTarget != e.target ) return;
      e.stopPropagation();
      props.closeMenu();
    }} ref={wrapperRef} className={`todoMenu ${props.toggleMenu && 'opened'}`}>
      
      <ButtonWithIcon onClick={()=>props.moveTodo('up')} colorScheme={'gray'} icon={<ArrowUpIcon/>}>위로</ButtonWithIcon>
      <ButtonWithIcon onClick={()=>props.moveTodo('down')} colorScheme={'gray'} icon={<ArrowDownIcon/>}>아래로</ButtonWithIcon>
      <ButtonWithIcon onClick={()=>props.moveTodo('back')} colorScheme={'gray'} icon={<ArrowBackIcon/>}>하루전</ButtonWithIcon>
      <ButtonWithIcon onClick={()=>props.moveTodo('forward')} colorScheme={'gray'} icon={<ArrowForwardIcon/>}>다음날</ButtonWithIcon>

    </Box>
  )
}

export default TodoMoveMenu