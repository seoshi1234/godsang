import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { StampBoard, StampGoal} from '../../Models/StampModel'
import './StampBoard.css'

import
{
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import StampGoalElement from './StampGoalElement'
import moment from 'moment'
import { StampBoardController } from '../../Controllers/StampBoardController'

interface StampBoardProps{
  stampBoard:StampBoard
  setStampBoard:Dispatch<SetStateAction<StampBoard>>
}

function _StampBoard(props:StampBoardProps) {

  const [selectedGoalIdx, setSelectedGoalIdx] = useState<number>(-1);
  const { isOpen:isAddGoalOpen, onOpen:onAddGoalOpen, onClose:onAddGoalClose } = useDisclosure()

  const stampBoardController = useRef<StampBoardController>(new StampBoardController(props.setStampBoard, setSelectedGoalIdx));
  

  const renderStampContainer=(stampGoal:StampGoal)=>{
    let stamps=[];

    for(let i = 0; i<stampGoal?.stampCount; i++){

      let stampChild = stampGoal.stamps?.length > i && 
      <Box className='stampChild'>
        {stampGoal.stamps[i].date}
      </Box>;

      stamps.push(
        <Box className='stamp' key={i} onClick={()=>stampBoardController.current.handleStampClick(i)}>
          {stampChild}
        </Box>
      )
    }

    return(
      <Box className="stampContainer" ml={8}>
        {
          stamps
        }
      </Box> 
    );
  }

  useEffect(()=>{
    
  },[props.stampBoard])

  return (
    <div className="stampBoard">
      <Box className="stampGoalsContainer">
        {
          props.stampBoard.stampGoals.map((stampGoal,i)=>{
            return(
              <StampGoalElement 
              key={i}
              idx={i}
              selectedGoalIdx={selectedGoalIdx}
              stampBoardController={stampBoardController.current}
              stampGoal={stampGoal}/>
            )
          })
        }
        <Button className='stampGoal' onClick={()=>stampBoardController.current.addStampGoal()}>루틴 추가하기</Button>
      </Box>
      {
        selectedGoalIdx != -1 &&
        renderStampContainer(props.stampBoard.stampGoals[selectedGoalIdx])        
      }
      <Modal isOpen={isAddGoalOpen} onClose={onAddGoalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>루틴 추가하기</ModalHeader>
          <ModalCloseButton />
          <ModalBody>            
          </ModalBody>
          <ModalFooter>
            <Button variant='ghost'>Secondary Action</Button>
            <Button colorScheme='facebook' mr={3} onClick={onAddGoalClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default _StampBoard