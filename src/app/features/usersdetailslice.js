// actions/projectActions.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  usersdetail: [],
  loading: false,
  error: null,
};


const getTokenFromLocalStorage = () => {
  return localStorage.getItem('token'); 
};

export const fetchUsersdetail = createAsyncThunk(
  'usersdetail/fetchUsersdetail',
  async (id, { rejectWithValue }) => { 
    const token = getTokenFromLocalStorage();
    
    if (!token) {
    
      return rejectWithValue('Token not found in local storage');
    }
    
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/user/${id}`, {
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

const userdetailSlice = createSlice({
  name: 'usersdetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersdetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUsersdetail.fulfilled, (state, action) => {
        state.loading = false;
        state.usersdetail = action.payload;
      })
      .addCase(fetchUsersdetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectUsersdetail = (state) => state.usersdetail.usersdetail;

export default userdetailSlice.reducer;