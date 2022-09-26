import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { DailyTodos, Schedule, Todo } from '../Models/ScheduleModel';

export class ScheduleController{

  todoClipboard:Todo;
  todosClipboard:Todo[];
  setFocusIdx:Dispatch<SetStateAction<number>>;
  setSelectedSchedule:Dispatch<SetStateAction<DailyTodos>>;
  setSchedule:Dispatch<SetStateAction<Schedule>>;
  selectedDate:moment.Moment;
  debounceTimer:NodeJS.Timeout;
  
  constructor(setSchedule:Dispatch<SetStateAction<Schedule>>, setSelectedSchedule:Dispatch<SetStateAction<DailyTodos>>, setFocusIdx:Dispatch<SetStateAction<number>>, selectedDate:moment.Moment){
    this.selectedDate = selectedDate;
    this.setSchedule = setSchedule;
    this.setSelectedSchedule = setSelectedSchedule;
    this.setFocusIdx = setFocusIdx;
  }

  debounce(callback){
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(callback, 100);
  }

  onCompletedCheck(value:boolean, i:number){
    this.setSelectedSchedule(prev=>{
      const newSelectedSchedule = {...prev};
      newSelectedSchedule.todos[i].completed = value;
      return newSelectedSchedule;
    })
  }

  onNameChange(value:string, i:number){    
    this.debounce(()=>this.setSelectedSchedule(prev=>{
      const newSelectedSchedule = {...prev};
      newSelectedSchedule.todos[i].name = value;
      return newSelectedSchedule;
    }));
    
  }

  onTimerChange(value:string, i:number){
    this.setSelectedSchedule(prev=>{
      const newSelectedSchedule = {...prev};
      newSelectedSchedule.todos[i].timer = value;
      return newSelectedSchedule;
    })
  }

  onDiaryChange(value:string|null){    
    this.debounce(()=>this.setSelectedSchedule(prev=>{
      let newSelectedSchedule:DailyTodos;
      if(!prev){
        newSelectedSchedule = {
          date:this.selectedDate.format("YYYY년 M월 D일"),
          todos:[],
          diary:value,
        }
      }
      else{
        newSelectedSchedule = {...prev};
        newSelectedSchedule.diary=value;
      }
      return newSelectedSchedule;
    }));
  }

  onDeleteTimer(i:number){
    this.setSelectedSchedule(prev=>{
      const newSelectedSchedule = {...prev};
      newSelectedSchedule.todos[i].timer = null;
      return newSelectedSchedule;
    })
  }

  addTodo(){
    this.setSelectedSchedule(prev=>{
      let newSelectedSchedule:DailyTodos;
      if(!prev){
        newSelectedSchedule = {
          date:this.selectedDate.format("YYYY년 M월 D일"),
          todos:[{
            completed:false,
            name:'',
            timer:null          
          }]
        }
      }
      else{
        newSelectedSchedule = {...prev};
        if(newSelectedSchedule.todos?.length>0){
          newSelectedSchedule.todos.push({
            completed:false,
            name:'',
            timer:null
          })
        }
        else{
          newSelectedSchedule.todos = [{
            completed:false,
            name:'',
            timer:null
          }]
        }
      }
      this.setFocusIdx(newSelectedSchedule.todos.length);
      return newSelectedSchedule;
    })
  }

  insertTodo(idx:number){
    this.setSelectedSchedule(prev=>{
      const newSelectedSchedule = {...prev};
      newSelectedSchedule.todos.splice(idx+1,0,{
        completed:false,
        name:'',
        timer:null          
      });
      this.setFocusIdx(idx+1);
      return newSelectedSchedule;
    })
  }

  copyTodo(idx:number){
    this.setSelectedSchedule(prev=>{
      this.todoClipboard = {...(prev.todos[idx])};
      return prev;
    })
  }

  pasteTodo(idx:number){
    if(!this.todoClipboard) return;
    this.setSelectedSchedule(prev=>{
      const newSelectedSchedule = {...prev};
      newSelectedSchedule.todos.splice(idx+1,0,this.todoClipboard);
      this.setFocusIdx(idx+1);
      return newSelectedSchedule;
    })
  }

  deleteTodo(idx:number){
    this.setSelectedSchedule(prev=>{
      const newSelectedSchedule = {...prev};
      newSelectedSchedule.todos.splice(idx,1);
      this.setFocusIdx(idx);
      return newSelectedSchedule;
    })
  }

  moveTodo(idx:number, direction: "up" | "down" | "back" | "forward"){
    this.setSelectedSchedule(prevSelectedSchedule=>{
      const newSelectedSchedule = {...prevSelectedSchedule};
      const todoCopy = {...(prevSelectedSchedule.todos[idx])};
      newSelectedSchedule.todos.splice(idx,1);
      
      const dateToMove = this.selectedDate.clone();
      let scheduleToMove;
      
      switch(direction){
        case 'up':
          idx --;
          if(idx < 0) idx = 0;
          newSelectedSchedule.todos.splice(idx, 0, todoCopy);
          this.setFocusIdx(idx);
          break;
        case 'down':
          idx ++;
          if(idx >= newSelectedSchedule.todos.length) idx = newSelectedSchedule.todos.length;
          newSelectedSchedule.todos.splice(idx, 0, todoCopy);
          this.setFocusIdx(idx);
          break;
        case 'back':
          dateToMove.subtract(1,'days');
          this.setFocusIdx(0);
          break;
        case 'forward':        
          dateToMove.add(1,'days');
          this.setFocusIdx(0);
          break;
      }
      
      if(dateToMove.format('d') !== this.selectedDate.format('d')){
        this.setSchedule(prevSchedule=>{
          const newSchedule = {...prevSchedule};
    
          scheduleToMove = prevSchedule?.dailySchedules.findIndex((dailyTodo)=>{
            return dailyTodo.date === dateToMove.format("YYYY년 M월 D일");
          })
          
          if(scheduleToMove != -1){
            if(newSchedule.dailySchedules[scheduleToMove].todos){
              newSchedule.dailySchedules[scheduleToMove].todos.push(todoCopy);
            }else{
              newSchedule.dailySchedules[scheduleToMove].todos=[todoCopy];
            }
          }else{
            newSchedule.dailySchedules.push({
              date: dateToMove.format("YYYY년 M월 D일"),
              todos: [todoCopy]
            })
          }      
          return newSchedule;
        })
      }
      return newSelectedSchedule;
    })
  }

  copyTodos(){
    this.setSelectedSchedule(prev=>{
      if(prev) this.todosClipboard=[...prev.todos];
      return prev;
    })
  }

  pasteTodos(){
    this.setSelectedSchedule(prev=>{

      if(!this.todosClipboard) return;
      if(this.todosClipboard.length < 1) return;
  
      let newSelectedSchedule:DailyTodos;

      if(!prev){
        newSelectedSchedule = {
          date:this.selectedDate.format("YYYY년 M월 D일"),
          todos:[...this.todosClipboard]
        }
      }
      else{
        newSelectedSchedule = {...prev};
        if(newSelectedSchedule.todos?.length>0){
          this.todosClipboard.forEach(todo=>{
            newSelectedSchedule.todos.push({...todo});
          })        
        }
        else{
          newSelectedSchedule.todos = [...this.todosClipboard]
        }
      }
      return newSelectedSchedule;
    })
  }
}