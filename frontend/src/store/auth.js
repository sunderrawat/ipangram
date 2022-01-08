import { createSlice } from '@reduxjs/toolkit';
import getCookie from './../utils/getCookie';

const initialAuthState = {
  isAuthenticated:
    getCookie('token') && getCookie('token').length > 1 ? true : false,
  isOpen: false,
  modelSelect: 'signup',
};

const authSlice = createSlice({
  name: 'authentication',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
      localStorage.removeItem('user');
    },
    loginModel(state) {
      state.isOpen = !state.isOpen;
    },
    loginModelCustom(state, action) {
      state.isOpen = action.payload;
    },
    modalSelection(state, action) {
      state.modelSelect = action.payload;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
