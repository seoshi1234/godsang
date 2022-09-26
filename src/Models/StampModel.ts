import moment from 'moment'

export interface StampBoard{
  stampGoals:Array<StampGoal>
  uid:string
}

export interface StampGoal{
  name:string
  stampCount:number
  stamps:Array<Stamp>
}

export interface Stamp{
  date:string
}

export const generateRandomStampBoard:(string)=>StampBoard =(uid:string)=>{

  const today = new Date();  

  let goalContent = '';

  switch(Math.floor(Math.random()*3)){
    case 0:
      goalContent = '매일 아침 푸쉬업 3세트';
      break;
    case 1:
      goalContent = '매일 DevLog 작성'
      break;
    case 2:
      goalContent = '매일 산책 30분하기'
  }

  const stampBoard:StampBoard = {
    stampGoals:[{
      name:goalContent,
      stampCount:18,
      stamps:[{
        date:moment(today).format("M/D")
      }]
    }],
    uid:uid
  }

  return stampBoard
}