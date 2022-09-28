

import { createAction, createReducer } from '@reduxjs/toolkit'

const login = createAction('user/login')
const logout = createAction('user/logout')

const initialState = {
    userName: "",
    token: "",
    loggedin: false
}


const userReducer = createReducer(initialState, async (builder) => {
  builder
    .addCase(login, (state, action) => {
        const userName = action.payload.username;
        const token = action.payload.token;
        return {...state, username: userName, token: token, loggedin: true};
    })
    .addCase(logout, (state, action) =>{
        return {...state, username: '', token: '', loggedin: false}
    })
    .addDefaultCase((state, action) => {return {...state}})
})

export {login, logout};
export default userReducer;

