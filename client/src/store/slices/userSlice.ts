import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action) {
      state.username = action.payload;
    },
    logout(state) {
      state.username = null;
    }
  }
});

export const { login, logout } = userSlice.actions;
export const userReducer = userSlice.reducer;