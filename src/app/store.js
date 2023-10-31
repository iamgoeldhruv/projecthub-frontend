import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userslice';
import menuReducer from './features/userslice';
import projectReducer from  './features/projectslice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
    projects: projectReducer,
    
  },
});
export default store