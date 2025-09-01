import axios from "axios";
import { BASE_URL, RoutesApp } from "@/constants";

// 🔹 Получить список всех курсов
export async function getCourses() {
  const { data } = await axios.get(`${BASE_URL}${RoutesApp.getCourses}`);
  return data;
}

// 🔹 Получить курс по ID
export async function getCourseById(courseId: string) {
  const { data } = await axios.get(`${BASE_URL}${RoutesApp.getCourseById(courseId)}`);
  return data;
}

// 🔹 Получить тренировки курса
export async function getCourseWorkouts(courseId: string) {
  const { data } = await axios.get(`${BASE_URL}${RoutesApp.getCourseWorkouts(courseId)}`);
  return data;
}

// 🔹 Добавить курс пользователю
export async function addUserCourse(courseId: string) {
    const token = localStorage.getItem("authToken"); 
  const { data } = await axios.post(
    `${BASE_URL}${RoutesApp.addUserCourse}`,
    { courseId }, // тело запроса обязательно объектом
    {
      headers: {
        "Content-Type": "application/javascript",
        Authorization: `Bearer ${token}`, 
      },
    }
  );
  return data;
}

// 🔹 Удалить курс пользователя
export async function deleteUserCourse(courseId: string) {
   const token = localStorage.getItem("authToken"); 
  const { data } = await axios.delete(
    `${BASE_URL}${RoutesApp.deleteUserCourse(courseId)}`,
    {
      headers: {
        "Content-Type": "application/javascript",
        Authorization: `Bearer ${token}`, 
      },
    }
  );
  return data;
}
