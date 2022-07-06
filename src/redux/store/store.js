// import { applyMiddleware, createStore } from 'redux';
 
// // Logger with default options
import logger from 'redux-logger';
// import reducer from '../reducer/reducer.js';
// import thunkMiddleware from 'redux-thunk';

import { configureStore } from '@reduxjs/toolkit';
import taskReducer from '../reducer/reducer';

export default configureStore({
  reducer: {taskReducer},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})
 

// export default store;