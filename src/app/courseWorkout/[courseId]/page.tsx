"use client";

import CourseWorkout from "@/components/CourseWorkout/CourseWorkout";
import { useParams } from "next/navigation";

export default function CourseWorkoutPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params?.courseId;

  return (
    <>
      <CourseWorkout courseId={courseId} />
    </>
  );
}
