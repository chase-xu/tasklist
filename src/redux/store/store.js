
import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../reducer/reducer';
import userReducer from '../reducer/userReducer';


export default configureStore({
  reducer: {taskReducer, userReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});
 