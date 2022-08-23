import React, { useState } from 'react'
import './Menu.css'

import { FaStamp } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import {Button, IconButton, Box} from '@chakra-ui/react'
import 
{AddIcon, CalendarIcon} from '@chakra-ui/icons'
import ButtonWithIcon from './ButtonWithIcon'
import { MainPageType } from '../Pages/Main';
import { MdEditCalendar, MdQueryStats } from 'react-icons/md';

interface MenuProps{
  signOut :()=>void
  mainPageState:MainPageType
  setMainPageState
}

function Menu(props:MenuProps) {

  
  const [menuOpened, setMenuOpened] = useState<boolean>(false)


  const toggleMenu=()=>{
    setMenuOpened(!menuOpened);
  }

  return (
    <div className={`menu ${menuOpened && 'opened'}`}>
      
      <Box className="menu__btns" mt={3} transitionDuration={'.325s'}>        
        <ButtonWithIcon colorScheme={props.mainPageState === 'schedule' ? 'facebook' : 'gray'} onClick={()=>props.setMainPageState('schedule')} icon={<CalendarIcon/>}>스케쥴러</ButtonWithIcon>
      </Box>
      <Box className="menu__btns" mt={3} transitionDuration={'.25s'}>        
        <ButtonWithIcon colorScheme={props.mainPageState === 'diary' ? 'facebook' : 'gray'} onClick={()=>props.setMainPageState('diary')} icon={<MdEditCalendar/>}>나의기록</ButtonWithIcon>
      </Box>
      <Box className="menu__btns" mt={3} transitionDuration={'.175s'}>        
        <ButtonWithIcon colorScheme={props.mainPageState === 'stamp' ? 'facebook' : 'gray'} onClick={()=>props.setMainPageState('stamp')} icon={<FaStamp/>}>도장판</ButtonWithIcon>
      </Box>
      <Box className="menu__btns" mt={3} transitionDuration={'.1s'}>        
        <ButtonWithIcon onClick={props.signOut} colorScheme={'red'} icon={<GoSignOut/>}>로그아웃</ButtonWithIcon>
      </Box>


      <IconButton 
      onClick={toggleMenu}
      colorScheme={'facebook'} 
      borderRadius={'50%'} 
      mt={'20px'}
      pointerEvents={'all'}
      transform={menuOpened ? 'rotate(45deg)' : 'rotate(0deg)'} aria-label='openMenu' icon={<AddIcon/>}/>
      
    </div>
  )
}

export default Menu