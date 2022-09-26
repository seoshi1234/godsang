import moment from 'moment'

export interface DailyTodos{
  date:string,
  todos : Array<Todo>
  diary?:string|null
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

export interface Diary{
  date:string
  title:string|null
  value:string
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

