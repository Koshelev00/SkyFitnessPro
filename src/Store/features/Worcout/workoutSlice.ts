import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchWorkoutsThunk,
  fetchWorkoutByIdThunk,
  addUserWorkoutThunk,
  deleteUserWorkoutThunk,
} from "./thunk";

type Workout = {
  _id: string;
  name: string;
  description: string;
  video: string;
  exercises: Array<{
    _id: string;
    name: string;
    quantity: number;
  }>;
};

interface WorkoutsState {
  workouts: Workout[];
  currentWorkout: Workout | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: WorkoutsState = {
  workouts: [],
  currentWorkout: null,
  status: "idle",
  error: null,
};

const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 fetchWorkoutsThunk
      .addCase(fetchWorkoutsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchWorkoutsThunk.fulfilled,
        (state, action: PayloadAction<Workout[]>) => {
          state.status = "succeeded";
          state.workouts = action.payload;
        }
      )
      .addCase(
        fetchWorkoutsThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )

      // 🔹 fetchWorkoutByIdThunk
      .addCase(fetchWorkoutByIdThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchWorkoutByIdThunk.fulfilled,
        (state, action: PayloadAction<Workout>) => {
          state.status = "succeeded";
          state.currentWorkout = action.payload;
        }
      )
      .addCase(
        fetchWorkoutByIdThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )

      // 🔹 addUserWorkoutThunk
      .addCase(addUserWorkoutThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUserWorkoutThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(
        addUserWorkoutThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      )

      // 🔹 deleteUserWorkoutThunk
      .addCase(deleteUserWorkoutThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserWorkoutThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(
        deleteUserWorkoutThunk.rejected,
        (state, action: PayloadAction<any>) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default workoutSlice.reducer;
