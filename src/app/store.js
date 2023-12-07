import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userslice';
import menuReducer from './features/userslice';
import projectReducer from  './features/projectslice';
import listReducer from './features/listslice';
import cardReducer from './features/cardslice'
import usersdetailReducer from './features/usersdetailslice'
import projectMembersReducer from './features/projectmembersslice'

export const store = configureStore({
  reducer: {
    users: userReducer,
    menu: menuReducer,
    projects: projectReducer,
    lists: listReducer,
    cards: cardReducer,
    usersdetail: usersdetailReducer,
    projectMembers: projectMembersReducer,
    
  },
});
export default store