import { createSlice } from "@reduxjs/toolkit";



const userSlice = createSlice({
    name: 'user',
    initialState: {
      isauthenticated: false,
      username: null,
      token: null,
      userId: null,
    },
    reducers: {
      setUser: (state, action) => {
        state.isauthenticated = true;
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.userId = action.payload.userId;
      },
    },
  });
  
  export const { setUser } = userSlice.actions;
  export default userSlice.reducer;
 