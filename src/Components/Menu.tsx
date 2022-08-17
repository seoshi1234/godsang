import React, { useState } from 'react'
import './Menu.css'

import { FaStamp } from "react-icons/fa";
import { GoSignOut } from "react-icons/go";
import {Button, IconButton, Box} from '@chakra-ui/react'
import 
{AddIcon, CalendarIcon} from '@chakra-ui/icons'
import ButtonWithIcon from './ButtonWithIcon'

interface MenuProps{
  signOut :()=>void
  mainPageState:'stamp'|'schedule'
  setMainPageState
}

function Menu(props:MenuProps) {

  
  const [menuOpened, setMenuOpened] = useState<boolean>(false)


  const toggleMenu=()=>{
    setMenuOpened(!menuOpened);
  }

  return (
    <div className="menu">
      
      <Box className="menu__btns" mt={3} opacity={menuOpened ? '100%' : '0%'} left={menuOpened ? '0px' : '-200px'} transitionDuration={'.2s'}>        
        <ButtonWithIcon onClick={()=>props.setMainPageState('schedule')} icon={<CalendarIcon/>}>스케쥴러</ButtonWithIcon>
      </Box>
      <Box className="menu__btns" mt={3} opacity={menuOpened ? '100%' : '0%'} left={menuOpened ? '0px' : '-200px'} transitionDuration={'.15s'}>        
        <ButtonWithIcon onClick={()=>props.setMainPageState('stamp')} icon={<FaStamp/>}>도장판</ButtonWithIcon>
      </Box>
      <Box className="menu__btns" mt={3} opacity={menuOpened ? '100%' : '0%'} left={menuOpened ? '0px' : '-200px'} transitionDuration={'.1s'}>        
        <ButtonWithIcon onClick={props.signOut} colorScheme={'red'} icon={<GoSignOut/>}>로그아웃</ButtonWithIcon>
      </Box>


      <IconButton 
      onClick={toggleMenu}
      colorScheme={'facebook'} 
      borderRadius={'50%'} 
      mt={'20px'} 
      transform={menuOpened ? 'rotate(45deg)' : 'rotate(0deg)'} aria-label='openMenu' icon={<AddIcon/>}/>
      
    </div>
  )
}

export default Menu