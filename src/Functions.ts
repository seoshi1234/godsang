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

export interface SelectOption{
  start:number
  end:number
}

export const insertAtCursor=(myField:HTMLTextAreaElement, onChange:(value:string)=>void, myValue:string, selectOptions?:SelectOption)=>{
  
  if (myField.selectionStart || myField.selectionStart == 0) {
      let startPos = myField.selectionStart;
      let endPos = myField.selectionEnd;
      myField.value = myField.value.substring(0, startPos)
          + myValue
          + myField.value.substring(endPos, myField.value.length);
      
      const finalPos = startPos + myValue.length;
      
      myField.focus();

      const fullText = myField.value;
      myField.value = fullText.substring(0, finalPos);
      myField.scrollTop = myField.scrollHeight;
      myField.value = fullText;

      if(selectOptions){
        startPos = startPos + selectOptions.start;
        endPos = finalPos - selectOptions.end;
        myField.setSelectionRange(startPos, endPos);
      }
      else myField.setSelectionRange(finalPos, finalPos);

  } else {
      myField.value += myValue;
  }

  onChange(myField.value);
}