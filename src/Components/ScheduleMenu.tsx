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
Textarea,
} from '@chakra-ui/react'
import './ScheduleMenu.css'
import { useClickOutside } from '../Hooks'
import ButtonWithIcon from './ButtonWithIcon'
import { ArrowDownIcon, CopyIcon, DeleteIcon, EditIcon, TimeIcon } from '@chakra-ui/icons'
import { BsArrowReturnLeft, BsArrowsMove } from 'react-icons/bs'
import DiaryEditor from './DiaryEditor'


interface ScheduleMenuProps{  
  diary:string|null
  onDiaryChange
  deleteDiary
  copyTodos
  pasteTodos
  toggleMenu:boolean
  closeMenu:()=>void
  
}

function ScheduleMenu(props:ScheduleMenuProps) {

  

  const wrapperRef = useRef(null);

  useClickOutside(()=>{
    props.closeMenu();
  },wrapperRef)

  const { isOpen:isDiaryModalOpen, onOpen:onDiaryModalOpen, onClose:onDiaryModalClose } = useDisclosure()

  

  return (
    <Box ref={wrapperRef} className={`scheduleMenu ${props.toggleMenu && 'opened'}`}>
      
      <ButtonWithIcon onClick={onDiaryModalOpen} colorScheme={'gray'} icon={<EditIcon/>}>일기작성</ButtonWithIcon>
      <ButtonWithIcon onClick={props.copyTodos} colorScheme={'gray'} icon={<CopyIcon/>}>복사하기</ButtonWithIcon>
      <ButtonWithIcon onClick={props.pasteTodos} colorScheme={'gray'} icon={<BsArrowReturnLeft/>}>붙여넣기</ButtonWithIcon>

      <Modal isOpen={isDiaryModalOpen} onClose={onDiaryModalClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'3xl'}>일기 작성</ModalHeader>
          <ModalCloseButton />
          <ModalBody __css={{fontSize:'unset'}}>
            <DiaryEditor diary={props.diary} onDiaryChange={props.onDiaryChange}/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='facebook' mr={3} onClick={onDiaryModalClose}>
              완료
            </Button>
            <Button colorScheme='red' mr={3} onClick={()=>{
              onDiaryModalClose();
              props.deleteDiary();           
              }}>
              일기삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      

    </Box>
    
  )
}

export default ScheduleMenu