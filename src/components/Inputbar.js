import * as React from 'react';
import { InputGroup, Input, Button, InputRightElement } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';

const Inputbar=(props)=>{
    const toast = useToast();
    const dispatch = useDispatch();
    const [message, setMessage] = React.useState('')

    const handleChange=(event)=>{
      setMessage(event.target.value)
    }

    const handleClick = async (event)=>{
        try{
          event.preventDefault();
          const {data} = await axios.post('/api/v1/tasks/create', {text: message})
          dispatch({type: 'task/increment', payload: { _id: data.data.task._id, text: message}});
          
          toast({
              title: 'Task Added',
              description: message,
              status: 'success',
              duration: 9000,
              isClosable: true,
            })
          setMessage('')
        } catch(err){
          // console.log(err)
          toast({
            title: err.message,
            description: err.response.data.msg,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          
        }

    }
    const handleEnter=(event)=>{
      if (event.key === 'Enter') handleClick(event)
    }

    return (
      <InputGroup size='md' style={{
            marginLeft: '10%', marginRight: '10%',
            width: '80%',
            marginTop: '15%'
        }}>
        <Input
          pr='4rem'
          placeholder='Enter A Task'
          style={{padding:'2px'}}
          onChange={handleChange}
          value={message}
          onKeyUp={handleEnter}
        />
        <InputRightElement width='4.5rem'>
            <Button
            onClick={handleClick}
            >
            Submit
        </Button>
        </InputRightElement>
      </InputGroup>
    )
}

export default Inputbar;