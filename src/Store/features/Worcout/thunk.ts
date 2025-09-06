import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWorkouts, getWorkoutById, addUserWorkout, deleteUserWorkout } from "@/services/workouts";

// 🔹 Получить все тренировки
export const fetchWorkoutsThunk = createAsyncThunk(
  "workouts/fetchAll",
  async ({courseId, token}:{courseId:string, token:string}, { rejectWithValue }) => {
    try {
      return await getWorkouts(courseId, token);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Ошибка загрузки тренировок");
    }
  }
);

// 🔹 Получить тренировку по ID
export const fetchWorkoutByIdThunk = createAsyncThunk(
  "workouts/fetchById",
  async ({workoutId, token}: {workoutId: string, token: string}, { rejectWithValue }) => {
    try {
      return await getWorkoutById(workoutId, token);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Ошибка загрузки тренировки");
    }
  }
);

// 🔹 Добавить тренировку пользователю
export const addUserWorkoutThunk = createAsyncThunk(
  "workouts/addUserWorkout",
  async ({ workoutId, token }: { workoutId: string; token: string }, { rejectWithValue }) => {
    try {
      return await addUserWorkout(workoutId, token);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Ошибка добавления тренировки");
    }
  }
);

// 🔹 Удалить тренировку пользователя
export const deleteUserWorkoutThunk = createAsyncThunk(
  "workouts/deleteUserWorkout",
  async ({ workoutId, token }: { workoutId: string; token: string }, { rejectWithValue }) => {
    try {
      return await deleteUserWorkout(workoutId, token);
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Ошибка удаления тренировки");
    }
  }
);
