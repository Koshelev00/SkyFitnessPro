// 🌐 Базовый URL API
export const BASE_URL = "https://wedev-api.sky.pro/api/fitness";


export const RoutesApp = {
  login: "/auth/login",
  signup: "/auth/register",
  getUserProfile: "/users/me",
  getCourses: "/courses",
  getCourseById: (courseId: string) => `/courses/${courseId}`,
  getCourseWorkouts: (courseId: string) => `/courses/${courseId}/workouts`,
  addUserCourse: "/users/me/courses",
  deleteUserCourse: (courseId: string) => `/users/me/courses/${courseId}`,
  resetCourseProgress: (courseId: string) => `/courses/${courseId}/reset`,
  getWorkoutById: (workoutId: string) => `/workouts/${workoutId}`,
  saveWorkoutProgress: (courseId: string, workoutId: string) =>
    `/courses/${courseId}/workouts/${workoutId}`,
  resetWorkoutProgress: (courseId: string, workoutId: string) =>
    `/courses/${courseId}/workouts/${workoutId}/reset`,
  getCourseProgress: (courseId: string) =>
    `/users/me/progress?courseId=${courseId}`,
  getWorkoutProgress: (courseId: string, workoutId: string) =>
    `/users/me/progress?courseId=${courseId}&workoutId=${workoutId}`,
   getWorkoutProgressData: (courseId: string, workoutId: string) =>
    `/courses/${courseId}/workouts/${workoutId}/progress`,
};
