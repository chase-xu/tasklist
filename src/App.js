// import logo from './logo.svg';
import React from 'react';
import './App.css';
import {Switch} from 'react-router-dom';
import Inputbar from './components/Inputbar';
import Taskbar from './components/Taskbar';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';



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
  const [initRender, setInitRender] = React.useState(true)
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
        <header style={{
          textAlign:'center',
          marginTop: '5%',
        }}>
          <h1 style={{
            fontSize: '50px',
            fontWeight: '900',
            fontFamily: 'Courier New'
          }}>Task List</h1>
        </header>
      <div style={{marginTop: '5%',
          marginLeft: '25%',
          marginRight: '25%',}}>
        <div>
          <Inputbar />
        </div>
        <div className='App' style={{
          border: '1px solid',
          marginTop: '10%',
          minHeight: '20em',
          borderBottom: '16px solid',
          borderRight: '12px solid'}}>
            {tasks === undefined || tasks.length === 0   ? <></> : tasks.map((task, index)=> 
                  <Taskbar desc={task} key={index}/>
            )}
        </div>
      </div>
      </div>
      </React.Fragment>
    </Switch>
  );
}

export default App ;
