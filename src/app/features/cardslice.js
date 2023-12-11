import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cards: [],
    loading: false,
    error: null,
};

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token'); 
  };
  
  export const fetchCards = createAsyncThunk(
    'cards/fetchCards',
    async ({list_id,projectId} ,{ rejectWithValue }) => { 
      const token = getTokenFromLocalStorage();
      
      if (!token) {
      
        return rejectWithValue('Token not found in local storage');
      }
      
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/cards/${list_id}/${projectId}/`, {
          headers: {
            Authorization: "Token " + localStorage.getItem("token"),
            
          },
        });
        return response.data;
       
      } catch (error) {
        if(error.response.status===403){
          alert('You are not allowd only project members are allowed')
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  const cardSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchCards.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchCards.fulfilled, (state, action) => {
          state.loading = false;
          state.cards = action.payload;
        })
        .addCase(fetchCards.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const selectCards = (state) => state.cards.cards;
  
  export default cardSlice.reducer;