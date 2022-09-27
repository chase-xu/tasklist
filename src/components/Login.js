import React, { useEffect } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useToast, Box} from '@chakra-ui/react';
import styles from './login.module.css';
import { useDisclosure } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalCloseButton,
    ModalBody, ModalHeader, ModalFooter, Button, Input,
    InputGroup, InputRightElement, Stack} from '@chakra-ui/react';
import axios from 'axios';



const Login =(props)=>{

    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = React.useRef(null)
    const finalRef = React.useRef(null)
    const [show, setShow] = React.useState(false)
    const [user, setUser] = React.useState('')
    const [password, setPassword] = React.useState('')

    const {userName, jwt} = useSelector((state)=>{
        return state.userReducer
    })
    const toast = useToast();

    const dispatch = useDispatch();

    const handleClick=(e)=>{
        setShow(!show)
    }

    const handleLogin = async (e) =>{
        const payload = {
            userName: user, 
            password: password 
        }
        try{
            const res = await axios.post('http://localhost:8090/api/v1/login', payload)
            .catch(err=>{
                throw err;
            });
            if (res) {
                dispatch({type: 'user/login', payload: {userName: user, token: res.data.token }});
                toast({
                    title: 'Login',
                    description: 'login success',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
            };


        }catch(err){
            toast({
                title: 'Login Error',
                description: err.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
        }

    }
    const handleUser=(e)=>{
        setUser(e.target.value);
    }
    const handlePassword=(e)=>{
        setPassword(e.target.value);
    }

    return (
        <div className={styles['container']}>

            {/** Buttons */}
            <Box as='button' borderRadius='md' bg='white' color='black' px={6} h={9} border='solid' >
                Contact to ask for a user account
            </Box>
            <Box onClick={onOpen} as='button' borderRadius='md' bg='black' color='white' px={6} h={9}>
                Login
            </Box>

        {/** Modal for loging in */}
        <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Login</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>

                <Stack spacing={3}>
                    <InputGroup size='md'>
                        <Input
                        onChange={handleUser}
                        pr='4.5rem'
                        placeholder='Enter User Name'>
                        </Input>
                    </InputGroup>
                    <InputGroup size='md'>
                        <Input
                            onChange={handlePassword}
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enter password'
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                            {show ? 'Hide' : 'Show'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </Stack>

                </ModalBody>
                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={handleLogin}>
                    Sign In
                </Button>
                <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

    </div>
    );



}

export default Login;