import React, { useEffect, useRef, useState } from 'react'
import {Box, Button} from '@chakra-ui/react'
import './TodoMenu.css'
import { useClickOutside } from '../Hooks'


interface TodoMenuProps{
  toggleMenu:boolean
  closeMenu:()=>void
}

function TodoMenu(props:TodoMenuProps) {

  const wrapperRef = useRef(null);

  useClickOutside(()=>{
    props.closeMenu();
  },wrapperRef)

  

  return (
    <Box ref={wrapperRef} bg={'gray'} className={`todoMenu ${props.toggleMenu && 'opened'}`}>
      <Button>타이머설정</Button>
      <Button>복사</Button>
      <Button>붙여넣기</Button>
      <Button>삭제하기</Button>
    </Box>
    
  )
}

export default TodoMenu