import { createAction, createReducer } from '@reduxjs/toolkit'
import axios from 'axios';

const increment = createAction('task/increment')
const decrement = createAction('task/decrement')
const getAll = createAction('task/getAll')
const initialState = {tasks: []}


const taskReducer = createReducer(initialState, async (builder) => {
  builder
    .addCase(increment, (state, action) => {
      const tasks = [...state.tasks, action.payload]
      return {...state, tasks: tasks}
    })
    .addCase(decrement, (state, action) => {
      try{
        const data = state.tasks.filter((item, index)=>{
                return item._id !== action.payload._id
        })
        // console.log(data)
        return {...state, tasks: data}
        // }
      } catch(err){
        console.log(err)
      }
     
    }).addCase(getAll, (state, action)=>{   
      const data = action.payload
      return {...state, tasks: data}
    })
    .addDefaultCase((state, action) => {return {...state}})
})

export {increment, decrement};
export default taskReducer;


