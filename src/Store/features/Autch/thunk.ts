import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SignIn,
  SignUp,
  getUserProfile,
  AuthUserProp,
  AuthUserReturn,
} from "@/services/auth";
import { ApiError } from "@/Types/userType";

// SignInThunk
export const SignInThunk = createAsyncThunk<AuthUserReturn, AuthUserProp>(
  "auth/signIn",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await SignIn(userData);
      localStorage.setItem("authToken", res.token);
      return res;
    } catch (error: unknown) {
      const err = error as ApiError;
      const message = err.response?.data?.message || err.message || "Ошибка входа";
      return rejectWithValue(message);
    }
  }
);

// SignUpThunk
export const SignUpThunk = createAsyncThunk<AuthUserReturn, AuthUserProp>(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await SignUp(userData);
      return res;
    } catch (error: unknown) {
      const err = error as ApiError;
      const message = err.response?.data?.message || err.message || "Ошибка регистрации";
      return rejectWithValue(message);
    }
  }
);

// getUserProfileThunk
export const getUserProfileThunk = createAsyncThunk(
  "auth/getUserProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      return await getUserProfile(token);
    } catch (error: unknown) {
      const err = error as ApiError;
      const message = err.response?.data?.message || err.message || "Ошибка получения профиля";
      return rejectWithValue(message);
    }
  },
);