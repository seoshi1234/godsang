import React from 'react'
import './LandingPage.css'
import { Button, Box } from '@chakra-ui/react'
import {User} from '@firebase/auth'

interface LandingPageProps{
  onSignUpOpen:()=>void,  
  onSignInOpen:()=>void
}

function LandingPage(props:LandingPageProps) {
  return (
    <div className="landingPage">
      <div className="landingPage__contents">
        <p className="landingPage__text">꼬인인생 풀어주는</p>
        <span className="landingPage__logo">갓생</span>
        <span className="landingPage__title">노트</span>
        <br />
        <Button colorScheme='facebook' mt={4} mb={4} fontWeight={'light'} onClick={props.onSignUpOpen}>회원가입하기</Button>
        <div className='outlineBtn' onClick={props.onSignInOpen}>로그인하기</div>
        
      </div>
      
      
    </div>
  )
}

export default LandingPage