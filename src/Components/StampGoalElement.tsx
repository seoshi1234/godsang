import React from 'react'

import
{
  Box, Heading, Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'
import { StampGoal } from '../Models/Model'

interface StampGoalElementProps{
  idx:number
  selectedGoalIdx:number
  stampGoal:StampGoal
  handleGoalClick:(idx:number)=>void
  onStampCountChange:(value:number,idx:number)=>void
}

function StampGoalElement(props:StampGoalElementProps) {
  return (
    <Box className={`stampGoal ${props.idx===props.selectedGoalIdx && 'selected'}`} onClick={()=>{props.handleGoalClick(props.idx)}}>
      <Heading size={'md'} mb={3}>{props.stampGoal.name}</Heading>
      <Box display={'flex'} alignItems="center">
        <Text fontSize={'lg'} mr={3}>도장 개수</Text>
        <NumberInput size={'sm'} value={props.stampGoal.stampCount} onClick={e=>e.stopPropagation()} onChange={(vs,vn)=>props.onStampCountChange(vn,props.idx)}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
    </Box>
)
}

export default StampGoalElement