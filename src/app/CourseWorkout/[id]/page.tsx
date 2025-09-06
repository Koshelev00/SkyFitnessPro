"use client";

import  CourseWorkout from "@/components/CourseWorkout/CourseWorkout";
import { useParams } from "next/navigation";

export default function CourseWorkoutPage() {
  const params = useParams<{ id: string }>();
  const courseId = params?.id;

  return (
    <>
      <CourseWorkout courseId={courseId} />
    </>
  );
}
