import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
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
      state.accessToken = action.payload.accessToken;
      window.localStorage.setItem('access_token', action.payload.accessToken);
    },    
    doLogout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.accessToken = null;
      window.localStorage.removeItem('access_token');
    }
  },
});

export const {doLoginSuccess, doLogout } = authSlice.actions;
export default authSlice.reducer; 