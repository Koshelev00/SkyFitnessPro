import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCourseProgressThunk,
  fetchWorkoutProgressThunk,
  fetchWorkoutProgressDataThunk,
  saveWorkoutProgressThunk,
  resetWorkoutProgressThunk,
  resetCourseProgressThunk,
} from "./thunk";

interface ProgressState {
  courseProgress: any | null;
  workoutProgress: any | null;
  workoutProgressData: any | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProgressState = {
  courseProgress: null,
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
        state.courseProgress = action.payload;
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
    builder
      .addCase(resetWorkoutProgressThunk.fulfilled, (state) => {
        state.workoutProgressData = null;
      });

    // 🔹 Reset Course Progress
    builder
      .addCase(resetCourseProgressThunk.fulfilled, (state) => {
        state.courseProgress = null;
      });
  },
});

export default progressSlice.reducer;
