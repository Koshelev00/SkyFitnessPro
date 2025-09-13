import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCoursesThunk,
  fetchCourseByIdThunk,
  fetchCourseWorkoutsThunk,
  addUserCourseThunk,
  deleteUserCourseThunk,
} from "./thunk";
import { CourseType } from "@/Types/courseType";

export interface Course {
  _id: string;
  title: string;
  description: string;
}

export interface Workout {
  _id: string;
  title: string;
  duration: number;
}

interface CoursesState {
  courses: CourseType[];
  selectedCourse: CourseType | null;
  workouts: Workout[];
  currentCourse: CourseType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  selectedCourse: null,
  workouts: [],
  currentCourse: null,
  status: "idle",
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Все курсы
      .addCase(fetchCoursesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoursesThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCoursesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Ошибка загрузки курсов";
      })

      //Курс по ID
      .addCase(fetchCourseByIdThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCourse = action.payload;
        state.currentCourse = action.payload;
      })

      //Тренировки курса
      .addCase(fetchCourseWorkoutsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workouts = action.payload;
      })

      //Добавить курс пользователю
      .addCase(addUserCourseThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })

      //Удалить курс
      .addCase(deleteUserCourseThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = state.courses.filter(
          (course) => course._id !== action.meta.arg,
        );
      });
  },
});

export default coursesSlice.reducer;
