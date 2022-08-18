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


interface ScheduleMenuProps{  
  diary:string|null
  onDiaryChange
  deleteDiary
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

      <Modal isOpen={isDiaryModalOpen} onClose={onDiaryModalClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>일기 작성</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea value={props.diary} onChange={(e)=>{props.onDiaryChange(e.target.value)}}/>            
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