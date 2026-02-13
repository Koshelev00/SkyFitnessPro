import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchCourseProgressThunk,
  fetchWorkoutProgressThunk,
  fetchWorkoutProgressDataThunk,
  saveWorkoutProgressThunk,
  resetWorkoutProgressThunk,
  resetCourseProgressThunk,
} from "./thunk";

export interface WorkoutProgress {
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
  courseProgress: Record<string, CourseProgressResponse>;
  workoutProgress: WorkoutProgress | null;
  workoutProgressData: number[] | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProgressState = {
  courseProgress: {},
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
    // Course Progress
    builder
      .addCase(fetchCourseProgressThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchCourseProgressThunk.fulfilled,
        (state, action: PayloadAction<CourseProgressResponse>) => {
          state.status = "succeeded";
          const data = action.payload;
          if (data?.courseId) {
            state.courseProgress[data.courseId] = data;
          }
        }
      )
      .addCase(fetchCourseProgressThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Workout Progress
    builder
      .addCase(fetchWorkoutProgressThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchWorkoutProgressThunk.fulfilled,
        (state, action: PayloadAction<WorkoutProgress>) => {
          state.status = "succeeded";
          state.workoutProgress = action.payload;
        }
      )
      .addCase(fetchWorkoutProgressThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Workout Progress Data
    builder
      .addCase(fetchWorkoutProgressDataThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchWorkoutProgressDataThunk.fulfilled,
        (state, action: PayloadAction<number[]>) => {
          state.status = "succeeded";
          state.workoutProgressData = action.payload;
        }
      )
      .addCase(fetchWorkoutProgressDataThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });

    // Save Workout Progress
    builder
      .addCase(saveWorkoutProgressThunk.fulfilled, (state, action: PayloadAction<number[]>) => {
        state.workoutProgressData = action.payload;
      })
      .addCase(saveWorkoutProgressThunk.rejected, (state, action) => {
        state.error = action.payload as string;
      });

    // Reset Workout Progress
    builder.addCase(resetWorkoutProgressThunk.fulfilled, (state) => {
      state.workoutProgressData = null;
    });

    // Reset Course Progress
    builder.addCase(resetCourseProgressThunk.fulfilled, (state) => {
      state.courseProgress = {};
    });
  },
});

export default progressSlice.reducer;
export type { ProgressState};