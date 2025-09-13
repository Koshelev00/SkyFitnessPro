import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  SignIn,
  SignUp,
  getUserProfile,
  AuthUserProp,
  AuthUserReturn,
} from "@/services/auth";

// SignInThunk
export const SignInThunk = createAsyncThunk<AuthUserReturn, AuthUserProp>(
  "auth/signIn",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await SignIn(userData);
      localStorage.setItem("authToken", res.token);
      document.cookie = `token_global=${res.token}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
      return res;
    } catch (err: unknown) {
      let message = "Ошибка входа";
      if (err instanceof Error) message = err.message;
      return rejectWithValue(message);
    }
  },
);

// SignUpThunk
export const SignUpThunk = createAsyncThunk<AuthUserReturn, AuthUserProp>(
  "auth/signUp",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await SignUp(userData);
      return res;
    } catch (err: unknown) {
      let message = "Ошибка регистрации";
      if (err instanceof Error) message = err.message;
      return rejectWithValue(message);
    }
  },
);

// getUserProfileThunk
export const getUserProfileThunk = createAsyncThunk(
  "auth/getUserProfile",
  async (token: string, { rejectWithValue }) => {
    try {
      return await getUserProfile(token);
    } catch (err: unknown) {
      let message = "Ошибка получения профиля";
      if (err instanceof Error) message = err.message;
      return rejectWithValue(message);
    }
  },
);
