import * as React from 'react';
import { InputGroup, Input, Button, InputRightElement } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import {useSelector, useDispatch} from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

export default function Inputbar(props){
    const toast = useToast();
    const dispatch = useDispatch();
    const [message, setMessage] = React.useState('')

    const handleChange=(event)=>{
      setMessage(event.target.value)
    }

    const handleClick =(event)=>{
        // console.log(`Submitted ${event.target.value}`)
        event.preventDefault();
        dispatch({type: 'task/increment', payload: {id: uuidv4().toString(), text: message}});
        toast({
            title: 'Task Added',
            description: "A Task's Added",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
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