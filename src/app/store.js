import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userslice';
import menuReducer from './features/userslice';
import projectReducer from  './features/projectslice';
import listReducer from './features/listslice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    menu: menuReducer,
    projects: projectReducer,
    lists: listReducer,
    
  },
});
export default store