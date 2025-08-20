import { UserType } from '@/Types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: UserType | null;
  access: string | '';
  refresh: string | '';
  username: string | '';
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  access: '',
  refresh: '',
  username: '',
  isAuth: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
      localStorage.setItem('user', action.payload.username);
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      
    },
    setUserName(state, action: PayloadAction<string>) {
      state.username = action.payload;
      localStorage.setItem('username', action.payload);
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.access = action.payload;
      localStorage.setItem('access', action.payload);
    },
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refresh = action.payload;
      localStorage.setItem('refresh', action.payload);
    },
    clearUser(state) {
      state.user = null;
      state.access = '';
      state.refresh = '';
      state.username = '';
      state.isAuth = false;
      localStorage.removeItem('username');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      
    },
  },
});

export const {
  setUser,
  clearUser,
  setAccessToken,
  setRefreshToken,
  setUserName,
  setIsAuth,
} = authSlice.actions;
export const authSliceReducer = authSlice.reducer;