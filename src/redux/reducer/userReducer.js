

import { createAction, createReducer } from '@reduxjs/toolkit'

const login = createAction('user/login')
const logout = createAction('user/logout')

const initialState = {
    userName: "",
    token: "",
}


const userReducer = createReducer(initialState, async (builder) => {
  builder
    .addCase(login, (state, action) => {
        const userName = action.payload.userName;
        const password = action.payload.password;
        return {...state, userName: userName, password: password};
    })
    .addCase(logout, (state, action) =>{

    })
    .addDefaultCase((state, action) => {return {...state}})
})

export {login, logout};
export default userReducer;

