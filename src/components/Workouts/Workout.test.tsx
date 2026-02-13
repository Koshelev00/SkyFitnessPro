// src/components/Workouts/Workout.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Workout from "./Workouts";
import workoutReducer, { WorkoutsState } from "@/Store/features/Worcout/workoutSlice";
import coursesReducer, { CoursesState } from "@/Store/features/Courses/courseSlice";
import progressReducer, { ProgressState } from "@/Store/features/Progress/progressSlice";
import { WorkoutType } from "@/Store/features/Worcout/thunk";
import { CourseType } from "@/Types/courseType";

// 🔹 Моки данных
const mockWorkout: WorkoutType = {
  _id: "workout1",
  name: "Приседания / Отжимания",
  description: "Тестовая тренировка",
  video: "https://example.com/video.mp4",
  exercises: [
    { _id: "ex1", name: "Приседания (10 раз)", quantity: 10 },
    { _id: "ex2", name: "Отжимания (15 раз)", quantity: 15 },
  ],
};

const mockCourse: CourseType = {
  _id: "course1",
  nameRU: "Тестовый курс",
  nameEN: "Test Course",
  description: "Описание курса",
  directions: ["Сила"],
  fitting: ["Новичок"],
  token: "mock-token",
  workouts: [mockWorkout],
};

// 🔹 Преобразуем mockWorkout для CoursesState.workouts
const mockCourseWorkouts = mockWorkout.exercises.map(ex => ({
  _id: ex._id,
  title: ex.name,
  duration: ex.quantity,
}));

// 🔹 Preloaded state с точной типизацией
const preloadedState: {
  workouts: WorkoutsState;
  courses: CoursesState;
  progress: ProgressState;
} = {
  workouts: {
    workouts: [mockWorkout],
    currentWorkout: mockWorkout,
    status: "succeeded" as const,
    error: null,
    isOpen: false,
    Open: false,
  },
  courses: {
    courses: [mockCourse],
    selectedCourse: mockCourse,
    currentCourse: mockCourse,
    workouts: mockCourseWorkouts,
    status: "succeeded" as const,
    error: null,
  },
  progress: {
    courseProgress: {},
    workoutProgress: {
      workoutId: "workout1",
      workoutCompleted: false,
      progressData: [5, 0],
      _id: "progress1",
    },
    workoutProgressData: [5, 0],
    status: "succeeded" as const,
    error: null,
  },
};

// 🔹 Настройка тестового store
const store = configureStore({
  reducer: {
    workouts: workoutReducer,
    courses: coursesReducer,
    progress: progressReducer,
  },
  preloadedState,
});

// 🔹 Тесты
describe("Workout Component", () => {
  it("рендерит название курса и видео", () => {
    render(
      <Provider store={store}>
        <Workout workoutId="workout1" courseId="course1" />
      </Provider>
    );

    expect(screen.getByText(/Тестовый курс/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Workout video/i)).toBeInTheDocument();
  });

  it("рендерит упражнения с прогрессом", () => {
    render(
      <Provider store={store}>
        <Workout workoutId="workout1" courseId="course1" />
      </Provider>
    );

    expect(screen.getByText(/Приседания 50%/i)).toBeInTheDocument();
    expect(screen.getByText(/Отжимания 0%/i)).toBeInTheDocument();
  });

  it("показывает правильный текст кнопки", () => {
    render(
      <Provider store={store}>
        <Workout workoutId="workout1" courseId="course1" />
      </Provider>
    );

    expect(screen.getByRole("button")).toHaveTextContent("Обновить прогресс");
  });
});
