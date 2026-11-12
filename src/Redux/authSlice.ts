import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const TOKEN_KEY = 'auth_token';
const USERNAME_KEY = 'auth_username';

const initialState = {
  username: localStorage.getItem(USERNAME_KEY) ?? '',
  authenticated: Boolean(localStorage.getItem(TOKEN_KEY)),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signedIn(state, action: PayloadAction<string>) {
      state.username = action.payload;
      state.authenticated = true;
    },
    signedOut(state) {
      state.username = '';
      state.authenticated = false;
    },
  },
});

export const { signedIn, signedOut } = authSlice.actions;
export default authSlice.reducer;