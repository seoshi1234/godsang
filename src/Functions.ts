export const validateEmail = (email:string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const verifyPassword=(pw:string)=>{  
  let errorMessage=''
  let alphanumeric=/^[a-z0-9]+$/i;
  if(pw == "") errorMessage = "비밀번호를 입력하세요!";  
  
  else if(!pw.match(alphanumeric)) errorMessage = "영어와 숫자만 입력하세요!";        
    
  else if(pw.length < 8) errorMessage = "8글자를 넘어야되요!";
  
  else if(pw.length > 15) errorMessage = "15자를 넘으면 안되요!";  

  return errorMessage;
}  