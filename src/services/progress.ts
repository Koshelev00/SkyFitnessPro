import axios from "axios";
import { BASE_URL, RoutesApp } from "@/constants";

const api = axios.create({
  baseURL: BASE_URL,
});

// Хелпер для авторизации
const getAuthHeaders = () => {
  const token = localStorage.getItem("authToken");
  return { Authorization: `Bearer ${token}` };
};

// 🔹 Получить прогресс по курсу
export async function getCourseProgress(courseId: string) {
  const { data } = await api.get(RoutesApp.getCourseProgress(courseId), {
    headers: getAuthHeaders(),
  });
  return data;
}

// 🔹 Получить прогресс по тренировке
export async function getWorkoutProgress(courseId: string, workoutId: string, token: string) {
  const { data } = await api.get(RoutesApp.getWorkoutProgress(courseId, workoutId), {
    
      headers: {
        "Content-Type": "application/javascript",
        Authorization: `Bearer ${token}`, 
      },
    
  });
  return data;
}

// 🔹 Получить данные прогресса тренировки
export async function getWorkoutProgressData(courseId: string, workoutId: string) {
  const { data } = await api.get(RoutesApp.getWorkoutProgressData(courseId, workoutId), {
    
    
  });
  return data;
}

// 🔹 Сохранить прогресс тренировки
export async function saveWorkoutProgress(courseId: string, workoutId: string, progressData: number[]) {
  const { data } = await api.patch(
    RoutesApp.saveWorkoutProgress(courseId, workoutId),
    { progressData },
    { headers: { ...getAuthHeaders(), "Content-Type": "application/javascript" } }
  );
  return data;
}

// 🔹 Сбросить прогресс тренировки
export async function resetWorkoutProgress(courseId: string, workoutId: string) {
  const { data } = await api.patch(
    RoutesApp.resetWorkoutProgress(courseId, workoutId),
    {},
    { headers: { ...getAuthHeaders(), "Content-Type": "application/javascript" } }
  );
  return data;
}

// 🔹 Сбросить прогресс курса
export async function resetCourseProgress(courseId: string) {
  const { data } = await api.patch(
    RoutesApp.resetCourseProgress(courseId),
    {},
   { headers: { ...getAuthHeaders(), "Content-Type": "application/javascript" } }
  );
  return data;
}
