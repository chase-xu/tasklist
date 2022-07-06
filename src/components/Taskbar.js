import React from 'react';
import { HStack, Box, Text, CloseButton } from '@chakra-ui/react';
import {useSelector, useDispatch} from 'react-redux';

function Feature({ title, desc, id, ...rest }) {

    const dispatch = useDispatch();

    const tasks = useSelector((state)=>{
        return state.tasks
    })
    
    const handleClick=(event)=>{
        dispatch({type: 'task/decrement', payload: {id: id, text: desc}})
    }

    return (
        <div style={{width: '100%'}}>
            <Box p={6} shadow='md' borderWidth='1px' {...rest} style={{display: 'flex', justifyContent: 'space-between'}} >
                <Text mt={1} style={{fontFamily: 'Sylfaen'}}>{desc}</Text>
                <CloseButton size='md' style={{}} onClick={handleClick}/>
            </Box>
        </div>
    )
  }
  
export default function StackEx(props) {
    const [desc, setDesc] = React.useState(props.desc)

    return (
        <div>
            <HStack spacing={8} style={{
                marginLeft: '5%', marginRight: '5%', marginTop: '5%', marginBottom: '5%'
            }}>
                <Feature
                desc={desc.text}
                id={desc.id}/>
            </HStack>
        </div>

    )
  } 