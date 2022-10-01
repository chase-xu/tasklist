import React from 'react';
import { HStack, Box, Text, CloseButton, Input } from '@chakra-ui/react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';
import styles from './taskbar.module.css';


const Feature=({ text, _id, ...rest })=> {

    const dispatch = useDispatch();
    const toast = useToast();
    const inputRef = React.useRef();
    const boxRef = React.useRef();
    const [isEditing, setIsEditing] = React.useState(false);
    const [taskString, setTaskString] = React.useState(text);
    // const useStyle = styles[]
    // const [animation, setAnimation] = React.useState('90%');

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
        console.log(inputRef);
        if (inputRef.current && inputRef.current.contains(e.target)){
            // inside click
            setIsEditing(true);
        } else{
            setIsEditing(false);
        }
    }

    React.useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleTextClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleClick);
        };
      });
    
   
    return (
    
            <div 
            className={styles['stack']}
            ref = {boxRef}
            >
                <Box p={6} shadow='md'  borderWidth='1px' {...rest} style={{display: 'flex', justifyContent: 'space-between'}} >
                    {!isEditing ? 
                    <Text className={styles['text']} ref={inputRef} onClick={handleTextClick}  mt={1}
                    // onMouseEnter={()=>{setIsEditing(true)}} onMouseLeave={()=>{setIsEditing(false)}}
                    >{taskString}</Text> :
                    <Input
                        value={taskString}
                        onChange={handleChange}
                        size='sm'
                        // onMouseLeave={()=>{setIsEditing(false)}}
                    />
                    }
                    <CloseButton size='md'  style={{}} onClick={handleClick}/>
                </Box>
            </div>
        // </ReactCSSTransitionGroup>
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