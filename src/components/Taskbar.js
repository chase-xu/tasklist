import React from 'react';
import { HStack, Box, Text, CloseButton, Input } from '@chakra-ui/react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';
import styles from './taskbar.module.css';


const Feature=({ text, _id, index, ...rest })=> {

    const dispatch = useDispatch();
    const tasks = useSelector(state=>{
        return state.taskReducer.tasks;
    })
    // const task = useSelector((state)=>{
    //     return state.taskReducer.tasks.find((ele)=>{
    //         return ele._id === _id
    //     })
    // }, shallowEqual);
    // const [taskContent, setTaskContent] = React.useState(task)
    const toast = useToast();
    const boxRef = React.useRef(null);
    const closeRef = React.useRef(null);
    const focusRef = React.useRef(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [taskString, setTaskString] = React.useState(text);
    const [animation, setAnimation] = React.useState('0');
    const [ind, setIndex] = React.useState(index);
    const onDropItem = useSelector(state=>{
        return state.taskReducer.onDropItem;
    })
    const onDragItem = useSelector(state=>{
        return state.taskReducer.onDragItem;
    })
    // const [, setRender] = React.useState();


     
    // const id = useSelector((state)=>{
    //     return state.taskReducer.tasks
    // })

    // const text = useSelector((state)=>{
    //     state.taskReducer.tasks
    // })

    const handleClick = async (event)=>{

        try{
            const res = await axios.delete(`/api/v1/tasks/delete/${_id}`, {_id: _id, text: text})
            // console.log(` return is ${res.data.data}`)
            if(res.data.data){
                dispatch({type: 'task/decrement', payload: {_id: _id, text: text, }})
            }
          } catch(err){
            console.log(err)
            let msg = ""
            if(err.response.data.msg){
              msg = err.response.data.msg
            }else{
              msg = err.response.data
            }
            toast({
                title: err.message,
                description: msg,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })   
        }
    }

    const handleChange=(e)=>{
        setTaskString(e.target.value);
    }

    const handleTextClick=(e)=>{
        if(boxRef.current && boxRef.current.contains(e.target) && !closeRef.current.contains(e.target)){
            return;
        } else{
            if(isEditing) {
                setIsEditing(false)
                setAnimation(3);
            }
        }
    }

    const handleEnter =e=>{
        if(e.key === 'Enter'){
            dispatch({type: 'tasks/edit', payload: {_id: _id, text: taskString}});
            setIsEditing(false)
            toast({
                title: 'Task Edited',
                description: 'Task Edited Successfully',
                status: 'success',
                duration: 9000,
                isClosable: true,
              }) 
        }
    }

    React.useEffect(() => {
        // console.log(task)
        document.addEventListener("mousedown", handleTextClick);
        return () => {
          document.removeEventListener("mousedown", handleTextClick);
        };
      });

    const handleDragEnd=e=>{
        // let x = e.clientX;
        // let y = e.clientY;
        // console.log(e.dataTransfer.getData("ondrop"))
        // const data = JSON.parse(e.dataTransfer.getData("ondrop"));
        // console.log(data)
        // setTaskString 
    }
    
    const handleStartDrag=e=>{
        // e.preventDefault();
        // e.stopPropagation();
        e.dataTransfer.setData("item-index", JSON.stringify({text: taskString, index: index}));
    }

    const handleDragOver=e=>{
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.setData("ondrop", JSON.stringify({text: taskString, index: ind}));
        setAnimation('down');
    }
    const handleDragLeave=e=>{
        e.preventDefault();
        e.stopPropagation();
        setAnimation('up');
    }
    const handleDrop=e=>{
        // console.log(e.dataTransfer.getData("item-index"))
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.setData("ondrop", JSON.stringify({text: taskString, index: ind}));
        const data = JSON.parse(e.dataTransfer.getData("item-index"));
        const droppedItem = data.index;
        const text = data.text;
        console.log(ind, droppedItem)
        const currIndex = ind;
        if (droppedItem !== null) {
            console.log('in drop')
            const payload = {currIndex: currIndex, dropIndex: Number(droppedItem)};
            console.log(payload)
            dispatch({type: 'task/arrange', payload: payload});
            // setRender();
            // setTaskString(text)
            // setIndex(droppedItem)
            console.log(payload)
        }
    }
    
   
    return (

            <div 
                // index = {task.index}
                className={styles['stack']}
                draggable
                // onDrag={handleDrag}
                onDragStart={handleStartDrag}
                onDragEnd={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={(e)=>{
                    setIsEditing(true);
                }}
                ref = {boxRef}
                onMouseEnter={e=>{
                    setAnimation(1);
                }}
                onMouseLeave={e=>{
                    if(!isEditing) setAnimation(3);
                }}
                animation={animation}
                
            >
                <Box 
                p={6} shadow='md'  
                borderWidth='1px' {...rest} 
                style={{display: 'flex', 
                    border: 'solid black',
                    justifyContent: 'space-between'}} >

                    {!isEditing ?
                        <Text className={styles['text']}  
                            mt={1}
                            onClick={(e)=>{
                                setIsEditing(true);
                            }}
                            >{taskString} </Text> :
                        <Input 
                                
                                className='Input'
                                autoFocus
                                ref={focusRef} 
                                size='sm'
                                value={taskString}
                                onChange={handleChange}
                                onKeyUp={handleEnter}                                  
                        ></Input>
                        }
                    <CloseButton size='lg'
                        ref={closeRef}
                        onClick={handleClick}/>
                </Box>
            </div>
    )
  }
  
 const StackEx=(props)=> {
    return (
        <div>
            <HStack spacing={8} style={{
                marginLeft: '5%', marginRight: '5%', marginTop: '5%', marginBottom: '5%', justifyContent: 'center'
            }}>
            <Feature
                text={props.desc.text}
                _id={props.desc._id}
                index={props.desc.index}
                 />
            </HStack>
        </div>

    )
  } 


export default StackEx;