import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  user: null,
  token: null,
  role: null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLogin(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.role = action.payload.user.role;
      state.error = null;
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.token = null;
      state.role = null;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  }
});

export const { setLogin, setLogout, setError } = authSlice.actions;
export default authSlice.reducer;

export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectUser = (state) => state.auth.user;
export const selectRole = (state) => state.auth.role;
export const selectError = (state) => state.auth.error;
