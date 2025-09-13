'use client'

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchWorkoutByIdThunk } from "@/Store/features/Worcout/thunk";
import { fetchWorkoutProgressThunk, resetWorkoutProgressThunk, saveWorkoutProgressThunk } from "@/Store/features/Progress/thunk";
import AddProgressModal from "../AddProgressModal/AddProgressModal";
import ButtonGreen from "../Button/ButtonGreen";
import ProgressBar from "../ProgressBar/ProgressBar";
import { openModalWorkout, openModalCompleted } from "@/Store/features/Worcout/workoutSlice";
import AddCompleted from "../AddProgressModal/AddСompleted";
import { fetchCourseByIdThunk } from "@/Store/features/Courses/thunk";
import formatWorkoutName from "@/Utilite/formatWorkoutName";

type WorkoutProps = {
  workoutId: string;
  courseId: string;
};

const getAuthToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

export default function Workout({ workoutId, courseId }: WorkoutProps) {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | null>(null);

  const isOpen = useAppSelector((state) => state.workouts.isOpen);
  const Open = useAppSelector((state) => state.workouts.Open);
  const { currentWorkout, status, error } = useAppSelector((state) => state.workouts);
  const currentCourse = useAppSelector((state) => state.courses);
  const workoutProgress = useAppSelector((state) => state.progress.workoutProgress);

  useEffect(() => {
    setToken(getAuthToken());
  }, []);

  useEffect(() => {
    if (token && workoutId) {
      dispatch(fetchWorkoutByIdThunk({ workoutId, token }));
      dispatch(fetchCourseByIdThunk(courseId));
    }
  }, [dispatch, workoutId, token]);

  const loadProgress = () => {
    if (token) {
      dispatch(fetchWorkoutProgressThunk({ courseId, workoutId, token }));
    }
  };

  useEffect(() => {
    loadProgress();
  }, [dispatch, courseId, workoutId, token]);

  useEffect(() => {
    if (!isOpen && !Open) {
      loadProgress();
    }
  }, [isOpen, Open]);

  const openModal = () => dispatch(openModalWorkout());

  const resetProgressWorkout = async () => {
    if (!token) return;
    await dispatch(resetWorkoutProgressThunk({ courseId, workoutId }));
    await dispatch(fetchWorkoutProgressThunk({ courseId, workoutId, token }));
  };

  const completeWithoutProgress = async () => {
    if (!token) return;

    await dispatch(
      saveWorkoutProgressThunk({
        courseId,
        workoutId,
        progressData: [],})
    ).unwrap();

    dispatch(openModalCompleted());
    dispatch(fetchWorkoutProgressThunk({ courseId, workoutId, token }));
  };

  const isWorkoutCompleted = workoutProgress?.workoutCompleted === true;

  const calculateProgress = (exerciseProgress: number, quantity: number | undefined): number => {
    if (!quantity || quantity === 0) return 0;
    return Math.min(100, Math.round((exerciseProgress / quantity) * 100));
  };

  if (status === "loading") return <div className="mt-15">Загрузка тренировки...</div>;
  if (status === "failed") return <div className="mt-15">Ошибка: {error}</div>;
  if (!currentWorkout) return <div className="mt-15">Тренировка не найдена</div>;

  const formattedName = formatWorkoutName(currentWorkout.name);
  const hasProgress = workoutProgress?.progressData?.some((v: number) => v > 0);
  const hasExercises = currentWorkout.exercises?.length > 0;

  return (
    <div>
      <div className="mt-10 md:mt-15">
        <h2 className="text-2xl md:text-6xl font-medium md:leading-17.5">
          {currentCourse.selectedCourse?.nameRU}
        </h2>
      </div>

      <div className="mt-6 md:mt-10">
        <iframe
          src={currentWorkout.video}
          className="w-[343px] h-[189px] rounded-[9px] md:w-[790px] lg:w-[1160px] md:h-[435px] lg:h-[639px] md:rounded-[36px]"
          title="Workout video"
          allowFullScreen
        />
      </div>

      <div className="w-full max-w-[1160px] mt-6 md:mt-10 p-10 rounded-[30px] md:mb-[260px] bg-[#FFFFFF] shadow-2xl flex flex-col gap-5">
        <h2 className="text-[#001] text-[32px] font-normal">
          Упражнения тренировки: {formattedName.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentWorkout.exercises?.map((ex, i) => {
            const exerciseProgress = workoutProgress?.progressData?.[i] ?? 0;
            const progress = calculateProgress(exerciseProgress, ex.quantity);
            const exerciseName = ex.name.replace(/\s*\(.*?\)/g, '');
            return (
              <div key={i} className="w-full flex flex-col gap-2.5">
                <div className="text-lg font-normal">
                  {`${exerciseName} ${progress}%`}
                </div>
                <ProgressBar progress={progress} />
              </div>
            );
          })}
        </div>

        <div className="mt-10 w-[283px] md:mx-auto">
          <ButtonGreen
            text={
              isWorkoutCompleted
                ? "Начать заново"
                : hasExercises
                ? hasProgress
                  ? "Обновить прогресс"
                  : "Заполнить прогресс"
                : "Выполнить упражнение"
            }
            className="h-12.5 sm:w-80 text-lg w-full"
            onClick={
              isWorkoutCompleted
                ? resetProgressWorkout
                : hasExercises
                ? openModal
                : completeWithoutProgress
            }
          />
        </div>

        {isOpen && hasExercises && (
          <AddProgressModal
            exercises={currentWorkout.exercises}
            workoutId={workoutId}
            courseId={courseId}
          />
        )}
        {Open && <AddCompleted />}
      </div>
    </div>
  );
}
