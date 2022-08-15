import React, { Children, useState } from 'react'
import {Box, Button} from '@chakra-ui/react'

interface ButtonWithIconProps{
  colorScheme?:(string & {})
  | "gray" | "blue" | "cyan" | "green" | "orange" | "pink" | "purple" | "red" 
  | "teal" | "yellow" | "whiteAlpha" | "blackAlpha" | "linkedin" | "facebook" 
  | "messenger" | "whatsapp" | "twitter" | "telegram"
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>  
  children
  onClick?:React.MouseEventHandler<HTMLButtonElement>
  id?:string
}

function ButtonWithIcon(props:ButtonWithIconProps) {

  const [isHover, setIsHover] = useState<boolean>(false);

  return (
    <Button   
    id={props.id}
    onClick={props?.onClick}
    alignContent={'center'}  
    colorScheme={props.colorScheme || 'gray'}
    onMouseEnter={() => setIsHover(true)}
    onMouseLeave={() => setIsHover(false)}>
      {props.children}<Box className={`hoverIconEffect ${isHover && 'hover'}`}>&nbsp;{props.icon}</Box>
    </Button>
  )
}

export default ButtonWithIcon