"use client";

import { useParams } from "next/navigation";
import Workout from "@/components/Workouts/Workouts";

export default function WorkoutPage() {
  const params = useParams<{ workoutId: string; courseId: string }>();
  const workoutId = params?.workoutId;
  const courseId = params?.courseId;

  if (!workoutId || !courseId) return <p>Тренировка не найдена</p>;

  return <Workout  />;
}