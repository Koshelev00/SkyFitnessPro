import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCourseProgress,
  getWorkoutProgress,
  getWorkoutProgressData,
  saveWorkoutProgress,
  resetWorkoutProgress,
  resetCourseProgress,
} from "@/services/progress";
import { CourseProgressResponse, WorkoutProgress } from "./progressSlice";

// Получить прогресс курса
export const fetchCourseProgressThunk = createAsyncThunk<
  CourseProgressResponse, // тип возвращаемого значения
  string,                // тип аргумента
  { rejectValue: string } // тип rejectWithValue
>(
  "progress/fetchCourseProgress",
  async (courseId, { rejectWithValue }) => {
    try {
      return await getCourseProgress(courseId);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Ошибка получения прогресса курса";
      return rejectWithValue(message);
    }
  }
);

// Получить прогресс тренировки
export const fetchWorkoutProgressThunk = createAsyncThunk<
  WorkoutProgress,
  { courseId: string; workoutId: string; token: string },
  { rejectValue: string }
>(
  "progress/fetchWorkoutProgress",
  async ({ courseId, workoutId, token }, { rejectWithValue }) => {
    try {
      return await getWorkoutProgress(courseId, workoutId, token);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Ошибка получения прогресса тренировки";
      return rejectWithValue(message);
    }
  }
);

// Получить данные прогресса тренировки
export const fetchWorkoutProgressDataThunk = createAsyncThunk<
  number[],
  { courseId: string; workoutId: string },
  { rejectValue: string }
>(
  "progress/fetchWorkoutProgressData",
  async ({ courseId, workoutId }, { rejectWithValue }) => {
    try {
      return await getWorkoutProgressData(courseId, workoutId);
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Ошибка получения данных прогресса тренировки";
      return rejectWithValue(message);
    }
  }
);

// Сохранить прогресс тренировки
export const saveWorkoutProgressThunk = createAsyncThunk<
  number[],
  { courseId: string; workoutId: string; progressData: number[] },
  { rejectValue: string }
>(
  "progress/saveWorkoutProgress",
  async ({ courseId, workoutId, progressData }, { rejectWithValue }) => {
    try {
      return await saveWorkoutProgress(courseId, workoutId, progressData);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Ошибка сохранения прогресса";
      return rejectWithValue(message);
    }
  }
);

// Сбросить прогресс тренировки
export const resetWorkoutProgressThunk = createAsyncThunk<
  void,
  { courseId: string; workoutId: string },
  { rejectValue: string }
>(
  "progress/resetWorkoutProgress",
  async ({ courseId, workoutId }, { rejectWithValue }) => {
    try {
      return await resetWorkoutProgress(courseId, workoutId);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Ошибка сброса прогресса тренировки";
      return rejectWithValue(message);
    }
  }
);

// Сбросить прогресс курса
export const resetCourseProgressThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>(
  "progress/resetCourseProgress",
  async (courseId, { rejectWithValue }) => {
    try {
      return await resetCourseProgress(courseId);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Ошибка сброса прогресса курса";
      return rejectWithValue(message);
    }
  }
);
