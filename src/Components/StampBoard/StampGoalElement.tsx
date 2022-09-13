import React from 'react'

import
{
  Box, Heading, Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Button,
  IconButton,
} from '@chakra-ui/react'
import { StampGoal } from '../../Models/Model'
import { DeleteIcon } from '@chakra-ui/icons'

interface StampGoalElementProps{
  idx:number
  selectedGoalIdx:number
  stampGoal:StampGoal
  handleGoalClick:(idx:number)=>void
  onStampCountChange:(value:number,idx:number)=>void
  onStampNameChange:(value:string,idx:number)=>void
  deleteStampGoal:(idx:number)=>void
}

function StampGoalElement(props:StampGoalElementProps) {
  return (
    <Box className={`stampGoal ${props.idx===props.selectedGoalIdx && 'selected'}`} onClick={()=>{props.handleGoalClick(props.idx)}}>
      <Input size={'md'} mb={3} value={props.stampGoal.name} onClick={e=>e.stopPropagation()} onChange={(e)=>props.onStampNameChange(e.target.value,props.idx)}/>
      <Box display={'flex'} alignItems="center">
        <Text fontSize={'md'} mr={2}>도장 개수: </Text>
        <NumberInput size={'sm'} mr={3} value={props.stampGoal.stampCount} onClick={e=>e.stopPropagation()} onChange={(vs,vn)=>props.onStampCountChange(vn,props.idx)}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <IconButton aria-label='delete' icon={<DeleteIcon/>}colorScheme='red' onClick={(e)=>{
          e.stopPropagation();
          props.deleteStampGoal(props.idx);}}/>
      </Box>
    </Box>
)
}

export default StampGoalElement