import { UserType } from '@/Types/userType';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: UserType | null;
  isAuth: boolean;
  isOpen: boolean;
  token: string | null;
  isOpened: boolean;
}

const getInitialAuthState = (): AuthState => {

  if (typeof window !== 'undefined') {
    return {
      user: null,
      isAuth: !!localStorage.getItem('authToken'),
      isOpen: false,
      token: localStorage.getItem('authToken'),
      isOpened: false,
    };
  }
  
  return {
    user: null,
    isAuth: false,
    isOpen: false,
    isOpened: false,
    token: null
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialAuthState(),
  reducers: {
    setUser(state, action: PayloadAction<UserType>) {
      state.user = action.payload;
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.isAuth = false;
      state.token = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user.email');
      }
    },
    openModal: (state) => {
      state.isOpen = true;
      console.log(state.isOpen)
    },
    openModalUser: (state) => {
        state.isOpened = true;
        console.log( state.isOpened)
    },
     closeModalUser: (state) => {
        state.isOpened = false;
        console.log( state.isOpened)
    },

    closeModal: (state) => {
      state.isOpen = false;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuth = true;
      if (typeof window !== 'undefined') {
        localStorage.setItem('authToken', action.payload);
      }
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
  openModalUser,
  closeModalUser,

} = authSlice.actions;
export const authSliceReducer = authSlice.reducer;