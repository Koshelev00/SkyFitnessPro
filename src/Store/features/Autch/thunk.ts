import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignIn, SignUp, getUserProfile, AuthUserProp, AuthUserReturn } from "@/services/auth";


export  const SignInThunk = createAsyncThunk<AuthUserReturn, AuthUserProp>(
  "auth/signIn",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await SignIn(userData);
      localStorage.setItem("authToken", res.token);
      return res;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const SignUpThunk = createAsyncThunk<AuthUserReturn, AuthUserProp>(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      return await SignUp(userData);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);


export const getUserProfileThunk = createAsyncThunk(
  "auth/getUserProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      return await getUserProfile(token);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
