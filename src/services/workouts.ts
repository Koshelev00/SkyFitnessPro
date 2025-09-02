import axios from "axios";
import { BASE_URL, RoutesApp } from "@/constants";

// 🔹 Получить все тренировки
export async function getWorkouts(courseId:string, token:string) {
  const { data } = await axios.get(`${BASE_URL}${RoutesApp.getCourseWorkouts(courseId)}`,{
    headers:  {Authorization : `Bearer ${token}`},
  })

  return data;
}

// 🔹 Получить тренировку по ID
export async function getWorkoutById(workoutId: string) {
  const { data } = await axios.get(`${BASE_URL}${RoutesApp.getWorkoutById(workoutId)}`);
  return data;
}

// 🔹 Добавить тренировку пользователю
export async function addUserWorkout(workoutId: string, token: string) {
  const { data } = await axios.post(
    `${BASE_URL}${RoutesApp.saveWorkoutProgress}`,
    { workoutId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}

// 🔹 Удалить тренировку пользователя
export async function deleteUserWorkout(workoutId: string, token: string) {
  const { data } = await axios.delete(
    `${BASE_URL}${RoutesApp.resetWorkoutProgress}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return data;
}
