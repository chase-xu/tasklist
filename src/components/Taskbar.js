import React from 'react';
import { HStack, Box, Text, CloseButton } from '@chakra-ui/react';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import {useToast} from '@chakra-ui/react';

const Feature=({ title, text, _id, ...rest })=> {

    const dispatch = useDispatch();
    const toast = useToast()
    const handleClick = async (event)=>{
        try{
            
            const res = await axios.delete(`/api/v1/tasks/delete/${_id}`, {_id: _id, text: text})
            console.log(` return is ${res.data.data}`)
            if(res.data.data){
                dispatch({type: 'task/decrement', payload: {_id: _id, text: text}})
            }
          } catch(err){
            console.log(err)
            toast({
                title: err.message,
                description: err.response.data.msg,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
            
        }
        
    }

    return (
        <div style={{width: '100%'}}>
            <Box p={6} shadow='md' borderWidth='1px' {...rest} style={{display: 'flex', justifyContent: 'space-between'}} >
                <Text mt={1} style={{fontFamily: 'Sylfaen'}}>{text}</Text>
                <CloseButton size='md' style={{}} onClick={handleClick}/>
            </Box>
        </div>
    )
  }
  
 const StackEx=(props)=> {
    const [desc, setDesc] = React.useState(props.desc)
    return (
        <div>
            <HStack spacing={8} style={{
                marginLeft: '5%', marginRight: '5%', marginTop: '5%', marginBottom: '5%'
            }}>
                <Feature
                text={desc.text}
                _id={desc._id}/>
            </HStack>
        </div>

    )
  } 


export default StackEx;