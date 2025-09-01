import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SignInThunk, SignUpThunk, getUserProfileThunk } from "./thunk";

export interface User {
  _id: string;
  email: string;
  selectedCourses: string[];
  courseProgress: string[];
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  isAuth: boolean;
  token: string;
  user: User | null;
  email: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isOpened: boolean; 
  isOpen: boolean;   
}

const initialState: AuthState = {
  isAuth: false,
  token: "",
  user: null,
  email: "",
  status: "idle",
  error: null,
  isOpened: false,
  isOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
     
    },
    clearUser(state) {
      state.isAuth = false;
      state.token = "";
      state.user = null;
      state.email = "";
      localStorage.removeItem("authToken");
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
      if (state.user) {
        state.user.email = action.payload;
      }
    },
    openModalUser(state) {
      state.isOpened = true;
    },
    closeModalUser(state) {
      state.isOpened = false;
    },
    openModal(state) {
      state.isOpen = true;
    },
    closeModal(state) {
      state.isOpen = false;
    },
    
  initializeAuth(state) {
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("user.email");
      
      if (token) {
        state.token = token;
        state.isAuth = true;
        state.email = email || "";
      }
    },
  },
  
  extraReducers: (builder) => {
    builder
      
      .addCase(SignInThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SignInThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        localStorage.setItem("authToken", action.payload.token);
        state.isAuth = true;
      })
      .addCase(SignInThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      
      .addCase(SignUpThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(SignUpThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
        state.isAuth = true;
      })
      .addCase(SignUpThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      
      .addCase(getUserProfileThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.email = action.payload.user.email;
        state.isAuth = true;
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.isAuth = false;
        state.user = null;
      });
  },
});

export const {
  setIsAuth,
  clearUser,
  setEmail,
  openModal,
  closeModal,
  openModalUser,
  closeModalUser,
  initializeAuth,
} = authSlice.actions;

export default authSlice.reducer;
