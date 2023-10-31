// actions/projectActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    projects: [],
    loading: false,
    error: null,
  };
  
export const fetchUserProjects = createAsyncThunk(
  'projects/fetchUserProjects',
  async (user_id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/projects/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserProjects.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchUserProjects.fulfilled, (state, action) => {
          state.loading = false;
          state.projects = action.payload;
        })
        .addCase(fetchUserProjects.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const selectUserProjects = (state) => state.projects.projects;
  
  export default projectSlice.reducer;
