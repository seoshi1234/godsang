import React, { useEffect, useRef, useState } from 'react'
import 
{
Button,
Box,
useDisclosure,
Modal,
ModalOverlay,
ModalContent,
ModalHeader,
ModalFooter,
ModalBody,
ModalCloseButton,
Input,
} from '@chakra-ui/react'
import './TodoMenu.css'
import { useClickOutside } from '../Hooks'
import ButtonWithIcon from './ButtonWithIcon'
import { ArrowDownIcon, CopyIcon, DeleteIcon, TimeIcon } from '@chakra-ui/icons'
import { BsArrowReturnLeft } from 'react-icons/bs'


interface TodoMenuProps{
  idx:number
  timer:string|null
  onTimerChange
  toggleMenu:boolean
  closeMenu:()=>void
  copyTodo
  pasteTodo
  deleteTodo
  
}

function TodoMenu(props:TodoMenuProps) {

  const wrapperRef = useRef(null);

  useClickOutside(()=>{
    props.closeMenu();
  },wrapperRef)

  const { isOpen:isTimerModalOpen, onOpen:onTimerModalOpen, onClose:onTimerModalClose } = useDisclosure()

  return (
    <Box ref={wrapperRef} bg={'gray'}  className={`todoMenu ${props.toggleMenu && 'opened'}`}>
      
      <ButtonWithIcon onClick={onTimerModalOpen} colorScheme={'gray'} icon={<TimeIcon/>}>타이머설정</ButtonWithIcon>
      <ButtonWithIcon onClick={()=>props.copyTodo(props.idx)} colorScheme={'gray'} icon={<CopyIcon/>}>복사하기</ButtonWithIcon>
      <ButtonWithIcon onClick={()=>props.pasteTodo(props.idx)} colorScheme={'gray'} icon={<BsArrowReturnLeft/>}>붙여넣기</ButtonWithIcon>
      <ButtonWithIcon onClick={()=>props.deleteTodo(props.idx)} colorScheme={'red'} icon={<DeleteIcon/>}>삭제하기</ButtonWithIcon>

      <Modal isOpen={isTimerModalOpen} onClose={onTimerModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>타이머설정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type={'time'} value={props.timer} onChange={(e)=>{props.onTimerChange(e.target.value, props.idx)}}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onTimerModalClose}>
              완료
            </Button>            
          </ModalFooter>
        </ModalContent>
      </Modal>
      
    </Box>
    
  )
}

export default TodoMenu