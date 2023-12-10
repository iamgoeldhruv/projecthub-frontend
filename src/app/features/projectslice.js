import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  userProjects: [],  
  loading: false,
  error: null,
};

const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token');
};

export const fetchUserProjects = createAsyncThunk(
  'projects/fetchUserProjects',
  async (_, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    if (!token) {
      return rejectWithValue('Token not found in local storage');
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/projects/`, {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('token'),
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const fetchUserProjectsForUser = createAsyncThunk(
  'projects/fetchUserProjectsForUser',
  async (userId, { rejectWithValue }) => {
    const token = getTokenFromLocalStorage();

    if (!token) {
      return rejectWithValue('Token not found in local storage');
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user-projects/${userId}/`, {
        headers: {
          Authorization: 'Token ' + localStorage.getItem('token'),
        },
      });
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
      })
      .addCase(fetchUserProjectsForUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserProjectsForUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userProjects = action.payload;
      })
      .addCase(fetchUserProjectsForUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectUserProjects = (state) => state.projects.projects;
export const selectUserProjectsForUser = (state) => state.projects.userProjects;

export default projectSlice.reducer;
