import {useRef } from 'react'
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
} from '@chakra-ui/react'
import './ScheduleMenu.css'
import { useClickOutside } from '../../Hooks'
import ButtonWithIcon from '../ButtonWithIcon'
import { CopyIcon, EditIcon } from '@chakra-ui/icons'
import { BsArrowReturnLeft } from 'react-icons/bs'
import DiaryEditor from '../Diary/DiaryEditor'
import { ScheduleController } from '../../Controllers/ScheduleController'


interface ScheduleMenuProps{  
  diary:string|null
  scheduleController:ScheduleController;
  toggleMenu:boolean
  closeMenu:()=>void
  setFocusIdx
}

function ScheduleMenu(props:ScheduleMenuProps) {

  

  const wrapperRef = useRef(null);

  useClickOutside(()=>{
    props.closeMenu();
  },wrapperRef)

  const { isOpen:isDiaryModalOpen, onOpen:onDiaryModalOpen, onClose:onDiaryModalClose } = useDisclosure()

  

  return (
    <Box onClick={(e)=>{
      if(e.currentTarget != e.target ) return;
      props.closeMenu();
    }}  ref={wrapperRef} className={`scheduleMenu ${props.toggleMenu && 'opened'}`}>
      
      <ButtonWithIcon onClick={()=>{
        onDiaryModalOpen();
        props.setFocusIdx(-1);
      }} colorScheme={'gray'} icon={<EditIcon/>}>일기작성</ButtonWithIcon>
      <ButtonWithIcon onClick={()=>props.scheduleController.copyTodos()} colorScheme={'gray'} icon={<CopyIcon/>}>복사하기</ButtonWithIcon>
      <ButtonWithIcon onClick={()=>props.scheduleController.pasteTodos()} colorScheme={'gray'} icon={<BsArrowReturnLeft/>}>붙여넣기</ButtonWithIcon>

      <Modal isOpen={isDiaryModalOpen} onClose={onDiaryModalClose} size='full'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'3xl'}>일기 작성</ModalHeader>
          <ModalCloseButton />
          <ModalBody __css={{fontSize:'unset'}}>
            <DiaryEditor diary={props.diary} onDiaryChange={(value)=>props.scheduleController.onDiaryChange(value)}/>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='facebook' mr={3} onClick={onDiaryModalClose}>
              완료
            </Button>
            <Button colorScheme='red' mr={3} onClick={()=>{
              onDiaryModalClose();
              props.scheduleController.onDiaryChange(null);
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