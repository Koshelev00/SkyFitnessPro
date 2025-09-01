import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCourseProgress,
  getWorkoutProgress,
  getWorkoutProgressData,
  saveWorkoutProgress,
  resetWorkoutProgress,
  resetCourseProgress,
} from "@/services/progress";

// 🔹 Получить прогресс курса
export const fetchCourseProgressThunk = createAsyncThunk(
  "progress/fetchCourseProgress",
  async (courseId: string, { rejectWithValue }) => {
    try {
      return await getCourseProgress(courseId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка получения прогресса курса");
    }
  }
);

// 🔹 Получить прогресс тренировки
export const fetchWorkoutProgressThunk = createAsyncThunk(
  "progress/fetchWorkoutProgress",
  async ({ courseId, workoutId }: { courseId: string; workoutId: string }, { rejectWithValue }) => {
    try {
      return await getWorkoutProgress(courseId, workoutId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка получения прогресса тренировки");
    }
  }
);

// 🔹 Получить данные прогресса тренировки
export const fetchWorkoutProgressDataThunk = createAsyncThunk(
  "progress/fetchWorkoutProgressData",
  async ({ courseId, workoutId }: { courseId: string; workoutId: string }, { rejectWithValue }) => {
    try {
      return await getWorkoutProgressData(courseId, workoutId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка получения данных прогресса тренировки");
    }
  }
);

// 🔹 Сохранить прогресс тренировки
export const saveWorkoutProgressThunk = createAsyncThunk(
  "progress/saveWorkoutProgress",
  async ({ courseId, workoutId, progressData }: { courseId: string; workoutId: string; progressData: number[] }, { rejectWithValue }) => {
    try {
      return await saveWorkoutProgress(courseId, workoutId, progressData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка сохранения прогресса");
    }
  }
);

// 🔹 Сбросить прогресс тренировки
export const resetWorkoutProgressThunk = createAsyncThunk(
  "progress/resetWorkoutProgress",
  async ({ courseId, workoutId }: { courseId: string; workoutId: string }, { rejectWithValue }) => {
    try {
      return await resetWorkoutProgress(courseId, workoutId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка сброса прогресса тренировки");
    }
  }
);

// 🔹 Сбросить прогресс курса
export const resetCourseProgressThunk = createAsyncThunk(
  "progress/resetCourseProgress",
  async (courseId: string, { rejectWithValue }) => {
    try {
      return await resetCourseProgress(courseId);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Ошибка сброса прогресса курса");
    }
  }
);
