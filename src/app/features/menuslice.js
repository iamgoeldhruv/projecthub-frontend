
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedItem: 'Dashboard', 
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
  },
});

export const { setSelectedItem } = menuSlice.actions;
export const selectSelectedItem = (state) => state.menu.selectedItem;

export default menuSlice.reducer;
