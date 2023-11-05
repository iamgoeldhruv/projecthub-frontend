import { createSlice } from '@reduxjs/toolkit';






const openProjectSlice = createSlice({
    name: 'openProject',
    initialState: null,
    reducers: {
      setOpenProject: (state, action) => {
        return action.payload;
      },
      clearOpenProject: (state) => {
        return null; 
      },
    },
  });
  
  export const { setOpenProject, clearOpenProject } = openProjectSlice.actions;
  
  export default openProjectSlice.reducer;