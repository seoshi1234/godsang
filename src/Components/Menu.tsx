import React, { useState } from 'react'
import './Menu.css'


import {Button, IconButton, Box} from '@chakra-ui/react'
import 
{AddIcon} from '@chakra-ui/icons'

interface MenuProps{
  signOut :()=>void
}

function Menu(props:MenuProps) {

  
  const [menuOpened, setMenuOpened] = useState<boolean>(false)


  const toggleMenu=()=>{
    setMenuOpened(!menuOpened);
  }

  return (
    <div className="menu">
      <Box className="menu__btns" onClick={props.signOut} opacity={menuOpened ? '100%' : '0%'} left={menuOpened ? '0px' : '-200px'} >
        <Button colorScheme={'red'}>로그아웃</Button>
        
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