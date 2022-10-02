import { createAction, createReducer } from '@reduxjs/toolkit'

const increment = createAction('task/increment');
const decrement = createAction('task/decrement');
const getAll = createAction('task/getAll');
const editing = createAction('task/edit');

const initialState = {
  tasks: []
}


const taskReducer = createReducer(initialState, async (builder) => {
  builder
    .addCase(increment, (state, action) => {
      const tasks = [...state.tasks, action.payload]
      return {...state, tasks: tasks}
    })
    .addCase(decrement, (state, action) => {
      try{
        console.log(action)
        const data = state.tasks.filter(item=>{
                return item._id !== action.payload._id
        })
        return {...state, tasks: data}
      } catch(err){
        console.log(err)
      }
     
    }).addCase(getAll, (state, action)=>{   
      const data = action.payload
      return {...state, tasks: data}
    })
    .addCase(editing, (state, action)=>{
      const data = action.payload;
      let tasks = state.tasks;
      for(let i=0; i < tasks.length; i ++){
        if(tasks[i]._id === data._id){
          tasks[i].text = data.text;
          break;
        }
      }
      return {...state, tasks: [...tasks]}
    })
    .addDefaultCase((state, action) => {return {...state}})
})

export {increment, decrement};
export default taskReducer;


