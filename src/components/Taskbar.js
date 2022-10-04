import React from 'react';
import { HStack, Box, Text, CloseButton, Input } from '@chakra-ui/react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';
import styles from './taskbar.module.css';


const Feature=({ text, _id, ...rest })=> {

    const dispatch = useDispatch();
    const toast = useToast();
    const boxRef = React.useRef(null);
    const closeRef = React.useRef(null);
    const focusRef = React.useRef(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [taskString, setTaskString] = React.useState(text);
    const [animation, setAnimation] = React.useState('0');
    

    const handleClick = async (event)=>{

        try{
            const res = await axios.delete(`/api/v1/tasks/delete/${_id}`, {_id: _id, text: text})
            // console.log(` return is ${res.data.data}`)
            if(res.data.data){
                dispatch({type: 'task/decrement', payload: {_id: _id, text: text}})
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
            setIsEditing(true);
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

        document.addEventListener("mousedown", handleTextClick);
        return () => {
          document.removeEventListener("mousedown", handleTextClick);
        };
      });
    
   
    return (

            <div 
                className={styles['stack']}
                ref = {boxRef}
                onMouseEnter={e=>{
                    setAnimation(1);
                }}
                onMouseLeave={e=>{
                    if(!isEditing) setAnimation(3);
                }}
                animation={animation}
            >
                <Box p={6} shadow='md'  borderWidth='1px' {...rest} 
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
                 />
            </HStack>
        </div>

    )
  } 


export default StackEx;