// actions/projectActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  ProjectMembers: [],
  loading: false,
  error: null,
};


const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token'); 
};

export const fetchProjectMembers = createAsyncThunk(
  'projectMembers/fetchProjectMembers',
  async (id, { rejectWithValue }) => { 
    const token = getTokenFromLocalStorage();
    
    if (!token) {
    
      return rejectWithValue('Token not found in local storage');
    }
    
    try {
      const response = await axios.get(`http://127.0.0.1:8000/project-members/${id}`, {
        headers: {
          Authorization: "Token " + localStorage.getItem("token"),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const projectMembersSlice = createSlice({
  name: 'projectMembers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectMembers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.projectMembers = action.payload;
      })
      .addCase(fetchProjectMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectProjectMembers = (state) => state.projectMembers.projectMembers;

export default projectMembersSlice.reducer;