"use client";

import { useParams } from "next/navigation";
import Course from "@/components/Course/Course";

export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const courseId = params?.id;

  if (!courseId) return null;
  return <Course courseId={courseId} />;
}
