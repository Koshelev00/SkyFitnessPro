import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CourseType } from '@/Types/courseType';

export type initialStateType = {
  currentCourse: CourseType | null;
  allCourses: CourseType[];
  favoriteCourses: CourseType[];
  fetchError: string | null;
  fetchIsLoading: boolean;
};

const initialState: initialStateType = {
  currentCourse: null,
  allCourses: [],
  favoriteCourses: [],
  fetchError: null,
  fetchIsLoading: true,
};

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setAllCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.allCourses = action.payload;
    },
    setFavoriteCourses: (state, action: PayloadAction<CourseType[]>) => {
      state.favoriteCourses = action.payload;
    },
    addFavoriteCourses: (state, action: PayloadAction<CourseType>) => {
      state.favoriteCourses = [...state.favoriteCourses, action.payload];
    },
    removeFavoriteCourses: (state, action: PayloadAction<CourseType>) => {
      state.favoriteCourses = state.favoriteCourses.filter(
        (course) => course._id !== action.payload._id,
      );
    },
    setFetchError: (state, action: PayloadAction<string>) => {
      state.fetchError = action.payload;
    },
    setFetchIsLoading: (state, action: PayloadAction<boolean>) => {
      state.fetchIsLoading = action.payload;
    },
  },
});

export const {
  setAllCourses,
  setFavoriteCourses,
  addFavoriteCourses,
  removeFavoriteCourses,
  setFetchError,
  setFetchIsLoading,
} = courseSlice.actions;
export const courseSliceReducer = courseSlice.reducer;