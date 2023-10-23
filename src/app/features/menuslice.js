// menuSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  menuItems: [], // Initialize as an empty array
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
  },
});

export const { setMenuItems } = menuSlice.actions;
export const selectMenuItems = (state) => state.menu.menuItems;

export default menuSlice.reducer;
