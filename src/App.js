// import logo from './logo.svg';
import React from 'react';
import './App.css';
import {BrowserRouter, Switch} from 'react-router-dom';
import Inputbar from './components/Inputbar';
import Taskbar from './components/Taskbar';
import {useSelector, useDispatch} from 'react-redux';


function App() {

  const tasks = useSelector((state)=>{
    console.log(state)
    return state.taskReducer.tasks
  })
  
  React.useEffect(()=>{
  },[tasks])
  

  return (
    <Switch>
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
          height: '20em',
          borderBottom: '16px solid',
          borderRight: '12px solid'}}>
            {tasks.length===0 ?<></> : tasks.map((task)=> 
                <Taskbar desc={task} />
            )}
        </div>
      </div>
      </div>
    </Switch>
  );
}

export default App ;
