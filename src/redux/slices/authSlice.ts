import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    doLoginSuccess: (state, action: PayloadAction<{ user: User, accessToken: string }>) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      window.localStorage.setItem('access_token', action.payload.accessToken);
    },    
    doGetAccount: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    doLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      window.localStorage.removeItem('access_token');
    }
  },
});

export const {doLoginSuccess, doLogout, doGetAccount } = authSlice.actions;
export default authSlice.reducer; 