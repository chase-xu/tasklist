import { createAction, createReducer } from '@reduxjs/toolkit'

const increment = createAction('task/increment');
const decrement = createAction('task/decrement');
const getAll = createAction('task/getAll');
const editing = createAction('task/edit');
const arrange = createAction('task/arrange');

const initialState = {
  tasks: [{text: 'test1', _id: '123sd4',index: 0}, {text: 'test2', _id: '123dfdsf4', index: 1},
  {text: 'test3', _id: '1sdfasd234', index:2}],
  // tasks : {
  //   0: {text: 'test1', _id: '123sd4',index: 0}, 
  //   1: {text: 'test2', _id: '123dfdsf4', index: 1},
  //   2: {text: 'test3', _id: '1sdfasd234', index:2}
  // },
  onDragItem: {},
  onDropItem: {},
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
      action.playoad.index = state.tasks.length
      const tasks = [...state.tasks, action.playoad]
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
      let tasks = state.tasks;
      for(let i=0; i < tasks.length; i ++){
        if(tasks[i]._id === data._id){
          tasks[i].text = data.text;
          break;
        }
      }
      return {...state, tasks: [...tasks]}
    })
    .addCase(arrange, (state, action)=>{
      const tasks = [...state.tasks];
      const currIndex = action.payload.currIndex;
      const dropIndex = action.payload.dropIndex;
      const curr = {...tasks[currIndex], index: dropIndex, text: tasks[currIndex].text}
      const next = {...tasks[dropIndex], index: currIndex};
      // tasks.splice(dropIndex, 1, curr);
      // tasks.splice(currIndex, 1, next);
      // tasks.sort((a, b)=>a.index - b.index);
      tasks[currIndex] = next;
      tasks[dropIndex] = curr;
      
      return {...state, tasks: [...tasks, {text: 'hello', _id: '5s8d2s', index: 123465}]}
    })
    .addDefaultCase((state, action) => {return {...state}})
})

// export {increment, decrement};
export default taskReducer;


