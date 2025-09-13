import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCourses,
  getCourseById,
  getCourseWorkouts,
  addUserCourse,
  deleteUserCourse,
} from "@/services/courses";

//Получить все курсы
export const fetchCoursesThunk = createAsyncThunk(
  "courses/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      return await getCourses();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//Получить курс по ID
export const fetchCourseByIdThunk = createAsyncThunk(
  "courses/fetchById",
  async (courseId: string, { rejectWithValue }) => {
    try {
      return await getCourseById(courseId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//Получить тренировки курса
export const fetchCourseWorkoutsThunk = createAsyncThunk(
  "courses/fetchWorkouts",
  async (courseId: string, { rejectWithValue }) => {
    try {
      return await getCourseWorkouts(courseId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//Добавить курс пользователю
export const addUserCourseThunk = createAsyncThunk(
  "courses/addUserCourse",
  async (courseId: string, { rejectWithValue }) => {
    try {
      return await addUserCourse(courseId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

//Удалить курс у пользователя
export const deleteUserCourseThunk = createAsyncThunk(
  "courses/deleteUserCourse",
  async (courseId: string, { rejectWithValue }) => {
    try {
      return await deleteUserCourse(courseId);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);
