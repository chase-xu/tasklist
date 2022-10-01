// import logo from './logo.svg';
import React from 'react';
import './App.css';
import {Switch} from 'react-router-dom';
import Inputbar from './components/Inputbar';
import Taskbar from './components/Taskbar';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';
import Login from './components/Login';


const  getAllTasks=()=> {
  return async dispatch => {
      try {
          const  res = await axios.get("/api/v1/tasks")
          dispatch({type: 'task/getAll', payload: res.data}) //store first five posts
      }
      catch(e){
          console.log(e)
      }
  }
}

function App() {

  const tasks = useSelector((state)=>{
    return state.taskReducer.tasks
  })
  const dispatch = useDispatch();
  const [initRender, setInitRender] = React.useState(true);
  const toast = useToast();
  

  React.useEffect(()=>{
    if(initRender) {
      try{
        dispatch(getAllTasks())
      }catch(e){
        console.log(e)
        toast({
          title: e.message,
          description: e.response.data.msg,
          status: 'error',
          duration: 9000,
          isClosable: true,
        })
      }
      setInitRender(false)
    };
  },[initRender, tasks, dispatch])

  

  return (
    <Switch>
      <React.Fragment >
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
        <React.Fragment>
          <div className='App' style={{
            border: '1px solid',
            marginTop: '5%',
            minHeight: '20em',
            borderBottom: '16px solid',
            borderRight: '12px solid'}}>
              {/* <Taskbar desc={{text: 'test', _id: '1234'}} key={1} /> */}
              {tasks === undefined || tasks.length === 0   ? <></> : tasks.map((task, index)=> 
                    <Taskbar desc={task} key={index}/>
              )}
          </div>
        </React.Fragment>
      </div>
      </div>
      </React.Fragment>
    </Switch>
  );
}

export default App ;
