import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCourseProgressThunk,
  fetchWorkoutProgressThunk,
  fetchWorkoutProgressDataThunk,
  saveWorkoutProgressThunk,
  resetWorkoutProgressThunk,
  resetCourseProgressThunk,
} from "./thunk";

// Типы для прогресса
interface WorkoutProgress {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
  _id: string;
}

export interface CourseProgressResponse {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: WorkoutProgress[];
  _id: string;
}

interface ProgressState {
  courseProgress: Record<string, CourseProgressResponse>; // ✅ ключ - courseId
  workoutProgress: any | null;
  workoutProgressData: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProgressState = {
  courseProgress: {}, // ✅ вместо null
  workoutProgress: null,
  workoutProgressData: null,
  status: "idle",
  error: null,
};

const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // 🔹 Course Progress
    builder
      .addCase(fetchCourseProgressThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourseProgressThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        const data = action.payload as CourseProgressResponse;
        if (data?.courseId) {
          state.courseProgress[data.courseId] = data; // ✅ сохраняем по courseId
        }
      })
      .addCase(fetchCourseProgressThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // 🔹 Workout Progress
    builder
      .addCase(fetchWorkoutProgressThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkoutProgressThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workoutProgress = action.payload;
      })
      .addCase(fetchWorkoutProgressThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // 🔹 Workout Progress Data
    builder
      .addCase(fetchWorkoutProgressDataThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkoutProgressDataThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workoutProgressData = action.payload;
      })
      .addCase(fetchWorkoutProgressDataThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // 🔹 Save Workout Progress
    builder
      .addCase(saveWorkoutProgressThunk.fulfilled, (state, action) => {
        state.workoutProgressData = action.payload;
      })
      .addCase(saveWorkoutProgressThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // 🔹 Reset Workout Progress
    builder.addCase(resetWorkoutProgressThunk.fulfilled, (state) => {
      state.workoutProgressData = null;
    });

    // 🔹 Reset Course Progress
    builder.addCase(resetCourseProgressThunk.fulfilled, (state) => {
      state.courseProgress = {}; // ✅ очищаем объект, а не null
    });
  },
});

export default progressSlice.reducer;
