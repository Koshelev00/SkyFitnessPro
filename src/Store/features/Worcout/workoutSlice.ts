import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchWorkoutsThunk,
  fetchWorkoutByIdThunk,
  addUserWorkoutThunk,
  deleteUserWorkoutThunk,
  WorkoutType,
} from "./thunk";

interface WorkoutsState {
  workouts: WorkoutType[];
  currentWorkout: WorkoutType | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isOpen: boolean; 
  Open: boolean;
}

const initialState: WorkoutsState = {
  workouts: [],
  currentWorkout: null,
  status: "idle",
  error: null,
  isOpen: false,
  Open: false,
};

const workoutSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    openModalWorkout(state) {
      state.isOpen = true;
    },
    closeModalWorkout(state) {
      state.isOpen = false;
    },
    openModalCompleted(state) {
      state.Open = true;
    },
    closeModalCompleted(state) {
      state.Open = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchWorkoutsThunk
      .addCase(fetchWorkoutsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkoutsThunk.fulfilled, (state, action: PayloadAction<WorkoutType[]>) => {
        state.status = "succeeded";
        state.workouts = action.payload;
      })
      .addCase(fetchWorkoutsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Неизвестная ошибка";
      })

      // fetchWorkoutByIdThunk
      .addCase(fetchWorkoutByIdThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkoutByIdThunk.fulfilled, (state, action: PayloadAction<WorkoutType>) => {
        state.status = "succeeded";
        state.currentWorkout = action.payload;
      })
      .addCase(fetchWorkoutByIdThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Неизвестная ошибка";
      })

      // addUserWorkoutThunk
      .addCase(addUserWorkoutThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addUserWorkoutThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addUserWorkoutThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Неизвестная ошибка";
      })

      // deleteUserWorkoutThunk
      .addCase(deleteUserWorkoutThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUserWorkoutThunk.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(deleteUserWorkoutThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Неизвестная ошибка";
      });
  },
});

export const { openModalWorkout, closeModalWorkout, openModalCompleted, closeModalCompleted } = workoutSlice.actions;
export default workoutSlice.reducer;
