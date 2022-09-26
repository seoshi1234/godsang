import { useEffect, useRef, useState } from 'react'
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
import { useClickOutside} from '../../Hooks'
import ButtonWithIcon from '../ButtonWithIcon'
import { CopyIcon, DeleteIcon, TimeIcon } from '@chakra-ui/icons'
import { BsArrowReturnLeft, BsArrowsMove } from 'react-icons/bs'
import TodoMoveMenu from './TodoMoveMenu'
import { useCheckMobile } from '../../Stores'
import { ScheduleController } from '../../Controllers/ScheduleController'


interface TodoMenuProps{
  idx:number
  timer:string|null
  toggleMenu:boolean  
  closeMenu:()=>void
  scheduleController:ScheduleController
}

function TodoMenu(props:TodoMenuProps) {

  const isMobile = useCheckMobile(state=>state.isMobile);

  const [moveMenuToggle,setMoveMenuToggle] = useState<boolean>(false);
  const { isOpen:isTimerModalOpen, onOpen:onTimerModalOpen, onClose:onTimerModalClose } = useDisclosure()
  
  const wrapperRef = useRef(null);
  
  
  useClickOutside(()=>{
    props.closeMenu();
  },wrapperRef)


  useEffect(()=>{
    if(!props.toggleMenu) setMoveMenuToggle(false);
  },[props.toggleMenu])

  return (
    <Box 
    onClick={(e)=>{      
      if(!isMobile) return;      
      if((e.target as HTMLElement).id === 'openMoveMenu') return;
      props.closeMenu();
    }} 
    ref={wrapperRef} className={`todoMenu ${props.toggleMenu && 'opened'}`}>
      
      <ButtonWithIcon onClick={onTimerModalOpen} colorScheme={'gray'} icon={<TimeIcon/>}>타이머설정</ButtonWithIcon>
      <ButtonWithIcon onClick={()=>props.scheduleController.copyTodo(props.idx)} colorScheme={'gray'} icon={<CopyIcon/>}>복사하기</ButtonWithIcon>
      <ButtonWithIcon onClick={()=>props.scheduleController.pasteTodo(props.idx)} colorScheme={'gray'} icon={<BsArrowReturnLeft/>}>붙여넣기</ButtonWithIcon>
      <div id="openMoveMenu" onClick={(e)=>{e.stopPropagation(); setMoveMenuToggle(true)}}>
        <ButtonWithIcon id='openMoveMenu' colorScheme={'gray'} icon={<BsArrowsMove/>}>
          이동하기
        </ButtonWithIcon>
        <TodoMoveMenu moveTodo={(dir)=>{
          props.scheduleController.moveTodo(props.idx,dir)
          props.closeMenu();
        }} toggleMenu={moveMenuToggle} closeMenu={()=>setMoveMenuToggle(false)}/>

      </div>
      <ButtonWithIcon onClick={()=>props.scheduleController.deleteTodo(props.idx)} colorScheme={'red'} icon={<DeleteIcon/>}>삭제하기</ButtonWithIcon>

      <Modal isOpen={isTimerModalOpen} onClose={onTimerModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>타이머설정</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type={'time'} value={props.timer} onChange={(e)=>{props.scheduleController.onTimerChange(e.target.value, props.idx)}}/>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='facebook' mr={3} onClick={onTimerModalClose}>
              완료
            </Button>
            <Button colorScheme='red' mr={3} onClick={()=>{
              onTimerModalClose();
              props.scheduleController.onTimerChange(null,props.idx); 
              }}>
              타이머삭제
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      

    </Box>
    
  )
}

export default TodoMenu