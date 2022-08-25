import React, { useEffect, useState } from 'react'
import { StampBoard, StampGoal} from '../Models/Model'
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

interface StampBoardProps{
  stampBoard:StampBoard
  setStampBoard
}

function _StampBoard(props:StampBoardProps) {

  const [selectedGoalIdx, setSelectedGoalIdx] = useState<number>(-1);
  const { isOpen:isAddGoalOpen, onOpen:onAddGoalOpen, onClose:onAddGoalClose } = useDisclosure()

  const handleGoalClick=(idx)=>{    
    setSelectedGoalIdx(idx===selectedGoalIdx ? -1 : idx);
  }

  const handleStampClick=(idx:number)=>{
    let newStampBoard = {...props.stampBoard};

    if(!props.stampBoard.stampGoals[selectedGoalIdx].stamps){
      props.stampBoard.stampGoals[selectedGoalIdx].stamps=[{date:moment().format('M/D')}];
    }

    else if(idx >= props.stampBoard.stampGoals[selectedGoalIdx].stamps.length){
      newStampBoard.stampGoals[selectedGoalIdx].stamps.push({date:moment().format('M/D')});
    }
    else{
      newStampBoard.stampGoals[selectedGoalIdx].stamps.splice(idx,1);
    }

    props.setStampBoard(newStampBoard);
  }

  const onStampCountChange=(value:number, idx:number)=>{
    let newStampBoard = {...props.stampBoard};
    newStampBoard.stampGoals[idx].stampCount = value;
    
    props.setStampBoard(newStampBoard);
  }

  const onStampNameChange=(value:string, idx:number)=>{
    let newStampBoard = {...props.stampBoard};
    newStampBoard.stampGoals[idx].name = value;
    
    props.setStampBoard(newStampBoard);
  }

  const addStampGoal=()=>{
    let newStampBoard = {...props.stampBoard};
    if(newStampBoard.stampGoals){
      newStampBoard.stampGoals.push({
        name:'',
        stampCount:18,
        stamps:[]
      });
    }else{
      newStampBoard.stampGoals=[{
        name:'',
        stampCount:18,
        stamps:[]
      }];
    }

    props.setStampBoard(newStampBoard);

  }

  const deleteStampGoal=(idx:number)=>{
    setSelectedGoalIdx(-1);
    let newStampBoard = {...props.stampBoard};
    newStampBoard.stampGoals.splice(idx,1)

    props.setStampBoard(newStampBoard);

  }

  const renderStampContainer=(stampGoal:StampGoal)=>{
    let stamps=[];

    for(let i = 0; i<stampGoal?.stampCount; i++){

      let stampChild = stampGoal.stamps?.length > i && 
      <Box className='stampChild'>
        {stampGoal.stamps[i].date}
      </Box>;

      stamps.push(
        <Box className='stamp' key={i} onClick={()=>handleStampClick(i)}>
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
              handleGoalClick={handleGoalClick} 
              idx={i}
              onStampCountChange={onStampCountChange}
              onStampNameChange={onStampNameChange}
              deleteStampGoal={deleteStampGoal}
              selectedGoalIdx={selectedGoalIdx}
              stampGoal={stampGoal}/>
            )
          })
        }
        <Button className='stampGoal' onClick={addStampGoal}>루틴 추가하기</Button>
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