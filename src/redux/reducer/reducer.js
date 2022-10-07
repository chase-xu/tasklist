import { createAction, createReducer } from '@reduxjs/toolkit'

const increment = createAction('task/increment');
const decrement = createAction('task/decrement');
const getAll = createAction('task/getAll');
const editing = createAction('task/edit');
const arrange = createAction('task/arrange');

const initialState = {
  tasks: [],
}



const taskReducer = createReducer(initialState, async (builder) => {
  builder
    .addCase(getAll, (state, action)=>{   
      const tasks = [...action.payload];
      tasks.forEach((ele, index)=>{
        ele.index = index
      });
      return {...state, tasks: [...tasks]}
    })
    .addCase(increment, (state, action) => {
      action.payload.index = state.tasks.length
      const tasks = [...state.tasks, action.payload]
      return {...state, tasks: [...tasks]}
    })
    .addCase(decrement, (state, action) => {
      try{
        const data = state.tasks.filter(item=>{
            return item._id !== action.payload._id
        })
        return {...state, tasks: data}
      } catch(err){
        console.log(err)
      }
    })
    .addCase(editing, (state, action)=>{
      const data = action.payload;
      const tasks = [...state.tasks];
      for(let i=0; i < tasks.length; i ++){
        if(tasks[i]._id === data._id){
          tasks[i] = {...tasks[i], text:data.text};
          break;
        }
      }
      return {...state, tasks: [...tasks]}
    })
    .addCase(arrange, (state, action)=>{
        const tasks = [...state.tasks];
        const currIndex = action.payload.currIndex;
        const dropIndex = action.payload.dropIndex;
        const curr = {...tasks[currIndex], index: dropIndex};
        const next = {...tasks[dropIndex], index: currIndex};
        tasks[currIndex] = next;
        tasks[dropIndex] = curr;

        return {...state, tasks: [...tasks]}
    })
    .addDefaultCase((state, action) => {return {...state}})
})

export default taskReducer;


