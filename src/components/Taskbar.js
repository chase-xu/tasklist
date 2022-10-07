import React from 'react';
import { HStack, Box, Text, CloseButton, Input } from '@chakra-ui/react';
import {useDispatch} from 'react-redux';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';
import styles from './taskbar.module.css';


const Feature=({ text, _id, index, ...rest })=> {

    const dispatch = useDispatch();
    const toast = useToast();
    const boxRef = React.useRef(null);
    const closeRef = React.useRef(null);
    const [isEditing, setIsEditing] = React.useState(false);
    const [taskString, setTaskString] = React.useState(text);
    const [animation, setAnimation] = React.useState('0');

    const handleClick = async (event)=>{
        try{
            event.preventDefault();
            const res = await axios.delete(`/api/v1/tasks/delete/${_id}`, {_id: _id, text: text})
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
            dispatch({type: 'task/edit', payload: {_id: _id, text: taskString}});
            setIsEditing(false)
            setTaskString('')
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

    
    const handleStartDrag=e=>{
        e.dataTransfer.setData("item-index", JSON.stringify({text: text, index: index, _id: _id}));
    }

    const handleDragOver=e=>{
        e.preventDefault();
        e.stopPropagation();
        setAnimation('down');
    }
    const handleDragLeave=e=>{
        e.preventDefault();
        e.stopPropagation();
        setAnimation('up');
    }
    const handleDrop=e=>{
        e.preventDefault();
        e.stopPropagation();
        const data = JSON.parse(e.dataTransfer.getData("item-index"));
        const droppedItem = data.index;
        const currIndex = index;
        if (droppedItem !== null) {
            const payload = {currIndex: currIndex, dropIndex: Number(droppedItem), curr_id: _id, drop_id: data._id};
            dispatch({type: 'task/arrange', payload: payload});
        }
    }
    
   
    return (
            <div 
                className={styles['stack']}
                draggable
                onDragStart={handleStartDrag}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={(e)=>{
                    if(!closeRef.current.contains(e.target)) setIsEditing(true);
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
                borderWidth='1px' 
                style={{display: 'flex', 
                border: 'solid black',
                justifyContent: 'space-between'}} >

                {!isEditing ?
                    <Text className={styles['text']}  
                        mt={1}
                        onClick={(e)=>{
                            setIsEditing(true);
                        }}
                        >{text} </Text> :
                    <Input 
                            className='Input'
                            autoFocus
                            size='sm'
                            placeholder={text}
                            onChange={handleChange}
                            onKeyUp={handleEnter}                                  
                    ></Input>
                    }
                    <CloseButton size='lg'
                        ref={closeRef}
                        onClick={handleClick} />
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