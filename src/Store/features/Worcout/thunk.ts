import { createAsyncThunk } from "@reduxjs/toolkit";
import { getWorkouts, getWorkoutById, addUserWorkout, deleteUserWorkout } from "@/services/workouts";

// Тип тренировки
export interface WorkoutType {
  _id: string;
  name: string;
  description: string;
  video: string;
  exercises: Array<{
    _id: string;
    name: string;
    quantity: number;
  }>;
}

// 🔹 Получить все тренировки
export const fetchWorkoutsThunk = createAsyncThunk<
  WorkoutType[], // return type
  { courseId: string; token: string }, // argument
  { rejectValue: string } // reject type
>(
  "workouts/fetchAll",
  async ({ courseId, token }, { rejectWithValue }) => {
    try {
      return await getWorkouts(courseId, token);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Ошибка загрузки тренировок";
      return rejectWithValue(message);
    }
  }
);

// 🔹 Получить тренировку по ID
export const fetchWorkoutByIdThunk = createAsyncThunk<
  WorkoutType,
  { workoutId: string; token: string },
  { rejectValue: string }
>(
  "workouts/fetchById",
  async ({ workoutId, token }, { rejectWithValue }) => {
    try {
      return await getWorkoutById(workoutId, token);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Ошибка загрузки тренировки";
      return rejectWithValue(message);
    }
  }
);

// 🔹 Добавить тренировку пользователю
export const addUserWorkoutThunk = createAsyncThunk<
  void,
  { workoutId: string; token: string },
  { rejectValue: string }
>(
  "workouts/addUserWorkout",
  async ({ workoutId, token }, { rejectWithValue }) => {
    try {
      await addUserWorkout(workoutId, token);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Ошибка добавления тренировки";
      return rejectWithValue(message);
    }
  }
);

// 🔹 Удалить тренировку пользователя
export const deleteUserWorkoutThunk = createAsyncThunk<
  void,
  { workoutId: string; token: string },
  { rejectValue: string }
>(
  "workouts/deleteUserWorkout",
  async ({ workoutId, token }, { rejectWithValue }) => {
    try {
      await deleteUserWorkout(workoutId, token);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Ошибка удаления тренировки";
      return rejectWithValue(message);
    }
  }
);
