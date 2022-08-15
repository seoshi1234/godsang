import moment from 'moment'

export interface DailyTodos{
  date:string,
  todos : Array<Todo>
}

export interface Schedule{
  dailySchedules : Array<DailyTodos>
  uid:string
}

export interface Todo{
  name:string,
  completed:boolean, 
  timer:string|null,
}

export const getUncompletedTodoCount=(todos:Array<Todo>)=>{
  if(todos?.length>0){
    return todos.reduce((count, cur)=>{
      return count+(cur.completed?0:1);
    },0)

  }
}

export const generateRandomSchedule:(string)=>Schedule =(uid:string)=>{

  const today = new Date();  

  let todoContent = '';

  switch(Math.floor(Math.random()*3)){
    case 0:
      todoContent = '고양이 밥주기';
      break;
    case 1:
      todoContent = '쿠키런 출석체크하기'
      break;
    case 2:
      todoContent = '헬스장 가기'
  }

  const schedule:Schedule = {
    dailySchedules: [{
      date: moment(today).format("YYYY년 M월 D일"),
      todos: [{
        name: todoContent,
        completed: false,
        timer: null,
      }]
    }],
    uid:uid
  }

  return schedule
}

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