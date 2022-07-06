import { createAction, createReducer } from '@reduxjs/toolkit'

const increment = createAction('task/increment')
const decrement = createAction('task/decrement')

const initialState = {tasks: []}

const taskReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state, action) => {
      console.log(action.payload)
      const tasks = [...state.tasks, action.payload]
      return {...state, tasks: tasks}
    })
    .addCase(decrement, (state, action) => {
      const data = state.tasks.filter((item)=>{
        return item.id !== action.payload.id
      })
      return {...data, tasks: data}
    
    }).addDefaultCase((state, action) => {return {...state}})
})

export {increment, decrement};

export default taskReducer;


