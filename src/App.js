// import logo from './logo.svg';
import React from 'react';
import './App.css';
import {Switch} from 'react-router-dom';
import Inputbar from './components/Inputbar';
import Taskbar from './components/Taskbar';
import {useSelector, useDispatch, shallowEqual, useStore} from 'react-redux';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';
import Login from './components/Login';


// const  getAllTasks=()=> {
//   return async dispatch => {
//       try {
//           // const res = await axios.get("/api/v1/tasks"); 
//           // const data = res.data
//         // const data = [{text: 'test1', _id: '1234'}, {text: 'test2', _id: '1234'},
//         // {text: 'test3', _id: '1234'}]
//           // dispatch({type: 'task/getAll', payload: data});
//       }
//       catch(e){
//           console.log(e)
//       }
//   }
// }

function App() {

  const tasks = useSelector((state)=>{
    return state.taskReducer.tasks;
  });

  const store = useStore();
  const dispatch = useDispatch();
  const [initRender, setInitRender] = React.useState(true);
  const toast = useToast();
  // const 
  
  const  getAllTasks=()=> {
    // return async dispatch => {
        // try {
            // const res = await axios.get("/api/v1/tasks"); 
            // const data = res.data
          // const data = [{text: 'test1', _id: '1234'}, {text: 'test2', _id: '1234'},
          // {text: 'test3', _id: '1234'}]
          // const data = [{text: 'test1', _id: '123sd4',index: 0}, {text: 'test2', _id: '123dfdsf4', index: 1},
          // {text: 'test3', _id: '1sdfasd234', index:2}]
          //   dispatch({type: 'task/getAll', payload: data});
        // }
        // catch(e){
        //     console.log(e)
        // }
    // }
  }

  React.useEffect(()=>{
    console.log(tasks)
    // if(initRender) {
    //   try{
    //     getAllTasks()
    //   //  dispatch(getAllTasks())
    //   }catch(e){ 
    //     console.log(e)
    //     toast({
    //       title: e.message,
    //       description: e.response.data.msg,
    //       status: 'error',
    //       duration: 9000,
    //       isClosable: true,
    //     })
    //   }
    //   setInitRender(false)
    // };
  })

  

  return (
    <div>
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '3em',
        }}>
          <Login/>
        </div>
        
        <header style={{
          textAlign:'center',
          marginTop: '2%',
        }}>
          <h1 style={{
            fontSize: '50px',
            fontWeight: '900',
            fontFamily: 'Courier New'
          }}>Task List</h1>
        </header>
        
        <div style={{marginTop: '1%',
          marginLeft: '30%',
          marginRight: '30%',
          textAlign:'center',
          fontSize: '20px',
          fontWeight: '900',
          fontFamily: 'Courier New'
          }}>
          <ul>
            <li>Currently the rate limits of requests is 6 requests per minute.</li>
          </ul>
        </div>

      <div style={{
          marginLeft: '25%',
          marginRight: '25%',
          marginBottom: '10%'}}>
        <div>
          <Inputbar />
        </div>
          <div className='App' style={{
            border: '1px solid',
            marginTop: '5%',
            minHeight: '20em',
            borderBottom: '16px solid',
            borderRight: '12px solid'}}>
              {/* <Taskbar desc={{text: 'test', _id: '1234'}} key={1} /> */}
              {/* <Taskbar desc={{text: 'test', _id: '1234'}} key={2} /> */}
              {(tasks === undefined || tasks.length === 0)   ? <></> : 
              tasks.map((task, index)=> 
                    <Taskbar desc={task} key={index} index={index}/>
              )
              }
          </div>
      </div>
      </div>
    </div>
  );
}

export default App ;
