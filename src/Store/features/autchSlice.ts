import { UserType } from '@/Types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: UserType | null;

  isAuth: boolean;
  isOpen: boolean;
  token: null;
}

const initialState: AuthState = {
  user: null,
 
  isAuth: false,
  isOpen: false,
  token: null
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
  
    clearUser(state) {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem('username');
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      
    },
    openModal: (state) => {
      state.isOpen = true;
     
    },
     closeModal: (state) => {
      state.isOpen = false;
    },
      setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const {
  setUser,
  clearUser,
  setIsAuth,
  openModal, 
  closeModal,
  setToken,
} = authSlice.actions;
export const authSliceReducer = authSlice.reducer;