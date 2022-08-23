import React, {Dispatch, SetStateAction, useEffect, useState } from 'react'
import './Calendar.css'
import moment from 'moment'

import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Heading,
  IconButton,  
} from '@chakra-ui/react'
import { ChevronUpIcon,ChevronDownIcon, CheckIcon } from '@chakra-ui/icons';
import { CSSObject } from '@emotion/react';
import { getUncompletedTodoCount, Schedule } from '../Models/Model';

interface CalendarProps{
  schedule:Schedule,
  today:moment.Moment,
  selectedDate:moment.Moment,
  setSelectedDate:Dispatch<SetStateAction<moment.Moment>>,
}


function Calendar(props:CalendarProps) {

  const weekdayshort:string[] = moment.weekdaysShort();
  const [dateObject,setDateObject] = useState<moment.Moment>(props.selectedDate.clone())

  const increaseMonth = ()=>{
    const currentMonth = moment(dateObject).format("M");
    const currentYear = moment(dateObject).format("YYYY");

    if(currentMonth === '12'){
      const nextYear = moment(dateObject).year(Number(currentYear)+1);
      setDateObject(moment(nextYear).month(0));
    }else{
      setDateObject(moment(dateObject).month(Number(currentMonth)));
    }
  }

  const decreaseMonth = ()=>{
    const currentMonth = moment(dateObject).format("M");
    const currentYear = moment(dateObject).format("YYYY");

    if(currentMonth === '1'){
      const prevYear = moment(dateObject).year(Number(currentYear)-1);
      setDateObject(moment(prevYear).month(11));
    }else{
      setDateObject(moment(dateObject).month(Number(currentMonth)-2));
    }
  }
  
  const firstDayOfMonth = ()=>moment(dateObject).startOf('month').format('d');
  
  
  const weekdayshortname = weekdayshort.map(day=>{
    return (
      <Th key={day} className="calendar__week-day">
        {day}
      </Th>
    )
  })

  let blanks = [];

  for(let i = 0; i < Number(firstDayOfMonth()); i++){
    blanks.push('');
  }

  let daysInMonth = [];

  for(let d = 1; d <= moment(dateObject).daysInMonth(); d++){    

    daysInMonth.push(d)
  }

  let totalSlots = [...blanks, ...daysInMonth];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row,i)=>{
    if(i%7!==0){
      cells.push(row);
    }else{
      rows.push(cells);
      cells=[];
      cells.push(row);
    }
    if(i === totalSlots.length-1){
      rows.push(cells);
    }
  })

  
  

  return (
    <div className="calendar">
      <Box className="calendar__navigation">
        <Heading size={'lg'} as='h2'>{moment(dateObject).format("M월 YYYY")}</Heading>
        <div className='calendar__navigationBtns'>
          <Button onClick={decreaseMonth}><ChevronUpIcon/></Button>
          <Button onClick={increaseMonth} ml={2}><ChevronDownIcon/></Button>
        </div>
      </Box>

      <Table size={'sm'}>
        <Thead>
          <Tr>{weekdayshortname}</Tr>
        </Thead>
        <Tbody>
          {
            rows.map((row,i)=>{
              return <Tr key={i}>{
                row.map((d,j)=>{
                  if(d === ''){
                    
                    return(
                      <Td className='calendar__day-empty' key={i*j}></Td>
                    )
                  }else{

                    let isToday = 
                    dateObject.format("M") === props.today.format("M") && 
                    d === Number(props.today.format("D"));

                    let isSelected = 
                    dateObject.format("M") === props.selectedDate.format("M") &&
                    d === Number(props.selectedDate.format("D"));

                    const sx:CSSObject = {
                      width:'100%',
                      borderRadius:0
                    };

                    let colorScheme ='gray'

                    if(isSelected) colorScheme='facebook';
                    else if(isToday) colorScheme='orange';

                    const currentMoment = dateObject.clone();
                    currentMoment.date(d);

                    const currentSchedule = props.schedule?.dailySchedules?.find((dailyTodo)=>{
                      return dailyTodo.date === currentMoment.format("YYYY년 M월 D일");
                    })

                    const clickFunc = ()=>{
                      const selectedDate = dateObject.date(d);                      
                      props.setSelectedDate(selectedDate.clone());                      
                    }
                    
                    return(
                      <Td key={i*j} className='calendar-day' padding={0}>
                        <Button sx={sx} colorScheme={colorScheme} onClick={clickFunc}>
                          {d}
                          <br/>
                          {
                            currentSchedule && 
                            currentSchedule.todos ?
                            getUncompletedTodoCount(currentSchedule.todos)>0 ?
                            <Box >
                            &nbsp; • {getUncompletedTodoCount(currentSchedule.todos)}
                            </Box>
                            :
                            <Box >
                            &nbsp; <CheckIcon/>
                            </Box>
                            :
                            <></>
                          }
                        </Button>                        
                      </Td>
                    )
                  }
                })
              }</Tr>
            })
          }
        </Tbody>
      </Table>
    </div>
  )
}

export default Calendar