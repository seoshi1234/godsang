import moment from 'moment';
import { Dispatch, SetStateAction } from 'react';
import { StampBoard } from '../Models/StampModel';

export class StampBoardController{
  setStampBoard:Dispatch<SetStateAction<StampBoard>>;
  setSelectedGoalIdx:Dispatch<SetStateAction<number>>;
  debounceTimer:NodeJS.Timeout;

  constructor(setStampBoard:Dispatch<SetStateAction<StampBoard>>, setSelectedGoalIdx:Dispatch<SetStateAction<number>>){
    this.setStampBoard = setStampBoard;
    this.setSelectedGoalIdx = setSelectedGoalIdx;
  }

  debounce(callback){
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(callback, 100);
  }

  handleGoalClick (idx:number){ 
    this.setSelectedGoalIdx(prevIdx=>idx===prevIdx ? -1 : idx);
  }

  handleStampClick (idx:number){
    this.setSelectedGoalIdx(prevIdx=>{
      this.setStampBoard(prevStampBoard=>{
        let newStampBoard = {...prevStampBoard};

        if(!prevStampBoard.stampGoals[prevIdx].stamps){
          prevStampBoard.stampGoals[prevIdx].stamps=[{date:moment().format('M/D')}];
        }
        else if(idx >= prevStampBoard.stampGoals[prevIdx].stamps.length){
          newStampBoard.stampGoals[prevIdx].stamps.push({date:moment().format('M/D')});
        }
        else{
          newStampBoard.stampGoals[prevIdx].stamps.splice(idx,1);
        }
        return newStampBoard;
      })
      return prevIdx;
    })
  }

  onStampCountChange (value:number, idx:number){
    this.setStampBoard(prevStampBoard=>{
      let newStampBoard = {...prevStampBoard};
      newStampBoard.stampGoals[idx].stampCount = value;
      return newStampBoard;
    })
  }

  onStampNameChange (value:string, idx:number){
    this.debounce(()=>this.setStampBoard(prevStampBoard=>{
      let newStampBoard = {...prevStampBoard};
      newStampBoard.stampGoals[idx].name = value;
      return newStampBoard;
    }));
    
  }

  addStampGoal (){
    this.setStampBoard(prevStampBoard=>{
      let newStampBoard = {...prevStampBoard};
      if(newStampBoard.stampGoals){
        newStampBoard.stampGoals.push({
          name:'',
          stampCount:18,
          stamps:[]
        });
      }else{
        newStampBoard.stampGoals=[{
          name:'',
          stampCount:18,
          stamps:[]
        }];
      }
      return newStampBoard;
    })

  }

  deleteStampGoal (idx:number){
    this.setStampBoard(prevStampBoard=>{
      this.setSelectedGoalIdx(-1);
      let newStampBoard = {...prevStampBoard};
      newStampBoard.stampGoals.splice(idx,1)
      return newStampBoard;
    })
  }

}