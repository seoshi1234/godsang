import React, { useState, useEffect } from 'react';

import './App.css';
import { firebaseConfig } from './firebaseConfig';
import { initializeApp } from 'firebase/app';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";
import {getDatabase, set, ref, Database, get, push, update} from "firebase/database"
import { Schedule, generateRandomSchedule} from './Models/ScheduleModel';
import { generateRandomStampBoard } from './Models/StampModel';

import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  FormControl,
  FormErrorMessage
} from '@chakra-ui/react'
import LandingPage from './Pages/LandingPage';
import Main from './Pages/Main';
import { validateEmail, verifyPassword } from './Functions';
import { useEventListener } from './Hooks';
import {useCheckMobile} from './Stores'
import AlertModal from './Components/AlertModal';


export type SignInState = 'signingIn' | 'signedIn' | 'failed' | 'default'

function App() {


  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  const db = getDatabase(app,"https://godsangsalgi-default-rtdb.asia-southeast1.firebasedatabase.app/");
  auth.useDeviceLanguage();
  
  
  const [user,setUser] = useState<User|null>(null)

  const {  isOpen:isSignInOpen, onOpen:onSignInOpen, onClose:onSignInClose } = useDisclosure();
  const {  isOpen:isSignUpOpen, onOpen:onSignUpOpen, onClose:onSignUpClose } = useDisclosure();

  const [email,setEmail] = useState<string>("");
  const [password,setPassword] = useState<string>("");
  const [confirmPassword,setConfirmPassword] = useState<string>("");  
  
  let isEmailError = validateEmail(email) == null;
  let isPasswordError = verifyPassword(password) !== '';
  let isConfirmPasswordError = password!==confirmPassword || confirmPassword === '';
  let isSignUpError = (isEmailError || isPasswordError || isConfirmPasswordError);
  let isSignInError = (isEmailError || isPasswordError);
  

  
  const signUp = (event)=>{
    event.preventDefault();
    if(isSignUpError) return;

    createUserWithEmailAndPassword(auth,email, password)    
    .then((authUser)=>{
      const schedule = generateRandomSchedule(authUser.user.uid);
      const stampBoard = generateRandomStampBoard(authUser.user.uid);
      
      set(ref(db, 'users/' + authUser.user.uid),{schedule:schedule, stampBoard:stampBoard})
      .then()
      .catch((reason)=>console.log(reason));
      
      onSignUpClose();
      
    })
    .catch((error)=>{
      
      alert(error.message)
      console.log(error)
    })
    
    onSignUpClose();
  }
  
  const signIn = (event)=>{    
    event.preventDefault();
    if(isSignInError) return;
    
    signInWithEmailAndPassword(auth, email, password)
    .then()
    .catch((error)=>{
      alert(error.message);
      console.log(error);
    });    
    onSignInClose();
  }

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
    
      if(authUser){
        setUser(authUser);
      }else{
        setUser(null);
      }
    })
  },[user]);

  useEventListener('resize',useCheckMobile(state=>state.checkIsMobile))

  return (
    <div className="App">

      {
        user ?
        <Main auth={auth} db={db}/>
        :
        <LandingPage onSignInOpen={onSignInOpen} onSignUpOpen={onSignUpOpen}/>
      }

      <Modal isOpen={isSignUpOpen} onClose={onSignUpClose}>
        <ModalOverlay />
        <ModalContent>
          <FormControl isInvalid={isSignUpError}>
            <ModalHeader>3??? ????????????</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Input isInvalid={isEmailError} placeholder='?????????' onChange={(e)=>{setEmail(e.target.value); console.log(validateEmail(email))}} value={email} id='email' type='email'></Input>                
                {
                  isEmailError?
                  <FormErrorMessage>????????? ????????? ????????????!</FormErrorMessage>:
                  <></>
                }
                <Input isInvalid={isPasswordError} mt={4} id='password' type='password' placeholder='????????????' onChange={(e)=>setPassword(e.target.value)} value={password}></Input>                
                {
                  isPasswordError?
                  <FormErrorMessage>{verifyPassword(password)}</FormErrorMessage>:
                  <></>
                }
                <Input isInvalid={isConfirmPasswordError} mt={2} id='confirmPassword' type='password' placeholder='???????????? ?????????!' onChange={(e)=>setConfirmPassword(e.target.value)}></Input>
                {
                  isConfirmPasswordError?
                  <FormErrorMessage>??????????????? ????????? ???????????????!</FormErrorMessage>:
                  <></>
                }
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='facebook' mr={3} onClick={signUp} type='submit'>
                ????????????
              </Button>
              <Button colorScheme='red'  onClick={onSignUpClose}>
                ??????
              </Button>            
            </ModalFooter>
          </FormControl>            
        </ModalContent>
      </Modal>
      
      <Modal isOpen={isSignInOpen} onClose={onSignInClose}>
        <ModalOverlay />
        <ModalContent>
          <FormControl isInvalid={isSignInError}>
            <ModalHeader>?????????</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input isInvalid={isEmailError} placeholder='?????????' onChange={(e)=>{setEmail(e.target.value); console.log(validateEmail(email))}} value={email} id='email' type='email'></Input>                
              {
                isEmailError?
                <FormErrorMessage>????????? ????????? ????????????!</FormErrorMessage>:
                <></>
              }
              <Input isInvalid={isPasswordError} mt={4} id='password' type='password' placeholder='????????????' onChange={(e)=>setPassword(e.target.value)} value={password}></Input>                
              {
                isPasswordError?
                <FormErrorMessage>{verifyPassword(password)}</FormErrorMessage>:
                <></>
              }
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='facebook' mr={3} onClick={signIn} type='submit'>
                ?????????
              </Button>
              <Button colorScheme='red'  onClick={onSignInClose}>
                ??????
              </Button>            
            </ModalFooter>
          </FormControl>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default App;
