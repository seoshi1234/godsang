import moment from 'moment'

export interface DailyTodos{
  date:string,
  todos : Array<Todo>
}

export interface Schedule{
  goals : Array<Goal>  
  dailySchedules : Array<DailyTodos>
  uid:string
}

export interface Todo{
  name:string,
  completed:boolean, 
  timer:string|null,
}

export interface Goal{
  completed: boolean,
  due:string,
  content: string
}

export const getUncompletedTodoCount=(todos:Array<Todo>)=>{
  return todos.reduce((count, cur)=>{
    return count+(cur.completed?0:1);
  },0)
}

export const generateRandomSchedule:(string)=>Schedule =(uid:string)=>{

  const today = new Date();
  const afterMonth = new Date();
  afterMonth.setDate(afterMonth.getDate() + 30);

  let goalContent = '';

  switch(Math.floor(Math.random()) * 3){
    case 0:
      goalContent = '턱걸이 10개 성공';
      break;
    case 1:
      goalContent = '롤 티어 골드 달성'
      break;
    case 2:
      goalContent = '수학 성적 20점 올리기'
  }

  const schedule:Schedule = {
    goals: [{
      completed : false,
      due: moment(afterMonth).format("YYYY년 M월 D일"),
      content : goalContent
    }],
    dailySchedules: [{
      date: moment(today).format("YYYY년 M월 D일"),
      todos: [{
        name: '고양이 밥주기',
        completed: false,
        timer: null,
      }]
    }],
    uid:uid
  }

  return schedule
}