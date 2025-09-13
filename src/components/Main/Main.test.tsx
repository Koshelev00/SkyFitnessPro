// src/components/Main/Main.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Main from "./Main";
import authReducer, { AuthState, User } from "@/Store/features/Autch/autchSlice";
import coursesReducer from "@/Store/features/Courses/courseSlice";
import workoutReducer from "@/Store/features/Worcout/workoutSlice";
import progressReducer from "@/Store/features/Progress/progressSlice";
import { CourseType } from "@/Types/courseType";

// Мокаем данные
const mockUser: User = {
  _id: "user1",
  email: "test@example.com",
  selectedCourses: [],
  courseProgress: [],
  createdAt: "",
  updatedAt: "",
};

const mockAuthState: AuthState = {
  isAuth: true,
  token: "mock-token",
  user: mockUser,
  email: mockUser.email,
  status: "succeeded",
  error: null,
  isOpened: false,
  isOpen: false,
};

const mockCoursesState = {
  courses: [
    {
      _id: "course1",
      nameRU: "Тестовый курс",
      nameEN: "Test Course",
      description: "Описание курса",
      directions: ["Направление 1", "Направление 2"],
      fitting: ["Новичок", "Продвинутый"],
      token: "mock-token",
      workouts: [],
    } as CourseType,
  ],
  selectedCourse: null,
  workouts: [],
  currentCourse: null,
  status: "succeeded" as const,
  error: null,
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    workouts: workoutReducer,
    progress: progressReducer,
  },
  preloadedState: {
    auth: mockAuthState,
    courses: mockCoursesState,
    workouts: { workouts: [], currentWorkout: null, status: "idle" as const, error: null, isOpen: false, Open: false },
    progress: { courseProgress: {}, workoutProgress: null, workoutProgressData: null, status: "idle" as const, error: null },
  },
});

describe("Main Component", () => {
  it("рендерит основной заголовок", () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(screen.getByText(/Начните заниматься спортом/i)).toBeInTheDocument();
  });

  it("рендерит описание секции", () => {
    render(
      <Provider store={store}>
        <Main />
      </Provider>
    );
    expect(screen.getByText(/и улучшите качество жизни/i)).toBeInTheDocument();
  });
});
