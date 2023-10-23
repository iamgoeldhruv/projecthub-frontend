import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userslice';
import menuReducer from './features/userslice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    menu: menuReducer,
  },
});
export default store