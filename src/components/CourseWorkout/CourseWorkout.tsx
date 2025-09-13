"use client";
import { useEffect } from "react";
import ButtonGreen from "../Button/ButtonGreen";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchWorkoutsThunk } from "@/Store/features/Worcout/thunk";
import {
  fetchCourseProgressThunk,
  resetCourseProgressThunk,
} from "@/Store/features/Progress/thunk";
import { RootState } from "@/Store/store";
import { useRouter } from "next/navigation";
import formatWorkoutName from "@/Utilite/formatWorkoutName";
import WorkoutName from "./WorkoutName";

type CourseWorkoutProps = {
  courseId: string;
};

export default function CourseWorkout({ courseId }: CourseWorkoutProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { workouts } = useAppSelector((state: RootState) => state.workouts);
  const { courseProgress } = useAppSelector(
    (state: RootState) => state.progress,
  );

  const token =
    typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  useEffect(() => {
    if (!token) return;
    dispatch(fetchWorkoutsThunk({ courseId, token }));
    dispatch(fetchCourseProgressThunk(courseId));
  }, [dispatch, courseId, token]);

  const getLessonNumber = (name: string): number | null => {
    const match = name.match(/(Урок\s*)?(\d+)/);
    if (match && match[2]) return parseInt(match[2], 10);
    return null;
  };

  const sortedWorkouts = [...workouts].sort((a, b) => {
    const numA = getLessonNumber(a.name) || 0;
    const numB = getLessonNumber(b.name) || 0;
    return numA - numB;
  });

  const isCompleted = (workoutId: string) => {
    const progressData = courseProgress[courseId]?.workoutsProgress;
    if (!progressData) return false;
    const progress = progressData.find((w) => w.workoutId === workoutId);
    return progress?.workoutCompleted === true;
  };

  const getNextWorkout = () => {
    if (!courseProgress[courseId]?.workoutsProgress)
      return sortedWorkouts[0]?._id || null;

    for (const workout of sortedWorkouts) {
      if (!isCompleted(workout._id)) return workout._id;
    }
    return null;
  };

  const nextWorkoutId = getNextWorkout();

  const handleStart = async () => {
    if (!token) return;

    if (!nextWorkoutId) {
      await dispatch(resetCourseProgressThunk(courseId));
      dispatch(fetchCourseProgressThunk(courseId));
    } else {
      router.push(`/courseWorkout/${courseId}/${nextWorkoutId}`);
    }
  };

  return (
    <div className="mt-[10%] md:mt-[20%] md:ml-[30%]">
      <div
        className="w-[343px] p-[30px] md:w-[460px] md:p-10 bg-[#FFFFFF] rounded-[30px] relative flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-12 flex items-center">
          <h2 className="text-[#000000] text-[32px] font-normal md:text-center">
            Выберите тренировку
          </h2>
        </div>

        <div
          className="w-[257px] md:w-[380px] mb-[34px] overflow-x-hidden max-h-[360px] overflow-y-auto
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:rounded-2xl
          [&::-webkit-scrollbar-thumb]:h-29
          [&::-webkit-scrollbar-track]:bg-[#F7F7F7]
          [&::-webkit-scrollbar-thumb]:rounded-2xl
          [&::-webkit-scrollbar-thumb]:bg-[#000000]"
        >
          {sortedWorkouts.length === 0 ? (
            <p className="text-center text-gray-500">
              Нет доступных тренировок
            </p>
          ) : (
            <div className="flex flex-col gap-[10px]">
              {sortedWorkouts.map((workout) => {
                const formattedName = formatWorkoutName(workout.name);
                const completed = isCompleted(workout._id);

                return (
                  <div
                    key={workout._id}
                    className="flex items-center justify-between w-full"
                  >
                    <WorkoutName
                      formattedName={formattedName}
                      completed={completed}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="w-[257px] md:w-[380px] h-[52px] mt-6">
          <ButtonGreen
            text={!nextWorkoutId ? "Удалить прогресс" : "Начать"}
            onClick={handleStart}
          />
        </div>
      </div>
    </div>
  );
}
