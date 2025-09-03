"use client";

import WorkoutModal from "@/components/Profile/WorkoutModal/workoutModal";
import { fetchCoursesThunk } from "@/Store/features/Courses/thunk";
import { AppDispatch, RootState } from "@/Store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function PageModal() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(fetchCoursesThunk());
    }
  }, [dispatch]);

  const { user } = useSelector((state: RootState) => state.auth);
  const { courses } = useSelector((state: RootState) => state.courses);

  const userCourses = courses.filter((course) =>
    user?.selectedCourses?.includes(course._id)
  );

  return (
    <>
      {userCourses.map((course) => (
        <WorkoutModal courseId={course._id} />
      ))}
    </>
  );
}
