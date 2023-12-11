// actions/projectActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  users: [],
  loading: false,
  error: null,
};


const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token'); 
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (id, { rejectWithValue }) => { 
    const token = getTokenFromLocalStorage();
    
    if (!token) {
    
      return rejectWithValue('Token not found in local storage');
    }
    
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/${id}/`, {
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

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectUsers = (state) => state.users.users;

export default userSlice.reducer;