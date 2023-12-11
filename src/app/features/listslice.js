import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    lists: [],
    loading: false,
    error: null,
};

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token'); 
  };
  
  export const fetchLists = createAsyncThunk(
    'lists/fetchLists',
    async (project_id, { rejectWithValue }) => { 
      const token = getTokenFromLocalStorage();
      
      if (!token) {
      
        return rejectWithValue('Token not found in local storage');
      }
      
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/lists/${project_id}`, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
          },
        });
        return response.data;
      } catch (error) {
        if(error.response.status===403){
          alert("YOU DONT HAVE PERMISSION TO VIEW THIS PROJECT")
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  const listSlice = createSlice({
    name: 'lists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchLists.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchLists.fulfilled, (state, action) => {
          state.loading = false;
          state.lists = action.payload;
        })
        .addCase(fetchLists.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const selectLists = (state) => state.lists.lists;
  
  export default listSlice.reducer;