'use client'
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchWorkoutByIdThunk } from "@/Store/features/Worcout/thunk";
import { fetchWorkoutProgressThunk, resetWorkoutProgressThunk } from "@/Store/features/Progress/thunk";
import AddProgressModal from "../AddProgressModal/AddProgressModal";
import ButtonGreen from "../Button/ButtonGreen";
import ProgressBar from "../ProgressBar/ProgressBar";
import { openModalWorkout } from "@/Store/features/Worcout/workoutSlice";
import AddCompleted from "../AddProgressModal/AddСompleted";
import Course from "../Course/Course";
import { fetchCourseByIdThunk } from "@/Store/features/Courses/thunk";

type WorkoutProps = {
  workoutId: string;
  courseId: string;
};

// Вспомогательная функция для безопасного доступа к localStorage
const getAuthToken = (): string | null => {
  try {
    if (typeof window !== "undefined") {
      return localStorage.getItem("authToken");
    }
    return null;
  } catch (error) {
    console.warn("LocalStorage access denied:", error);
    return null;
  }
};

export default function Workout({ workoutId, courseId }: WorkoutProps) {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string | null>(null);
  
  const isOpen = useAppSelector((state) => state.workouts.isOpen);
  const Open = useAppSelector((state) => state.workouts.Open);
  const { currentWorkout, status, error } = useAppSelector((state) => state.workouts);
  const currentCourse = useAppSelector((state) => state.courses);

  // Получаем токен при монтировании компонента
  useEffect(() => {
    const authToken = getAuthToken();
    setToken(authToken);
  }, []);

  useEffect(() => {
    if (token && workoutId) {
      dispatch(fetchWorkoutByIdThunk({ workoutId, token }));
      dispatch(fetchCourseByIdThunk(courseId))
    }
  }, [dispatch, workoutId, token]);

  useEffect(() => {
    if (token) {
      dispatch(fetchWorkoutProgressThunk({ courseId, workoutId, token }));
    }
  }, [dispatch, courseId, workoutId, token]);

  const openModal = () => {
    dispatch(openModalWorkout());
  };
 
  const resetProgressWorkout = () => {
    if (token) {
      dispatch(resetWorkoutProgressThunk({ courseId, workoutId}));
      dispatch(fetchWorkoutProgressThunk({ courseId, workoutId, token }));
    }
  };

  const workoutProgress = useAppSelector((state) => state.progress.workoutProgress);
  const isWorkoutCompleted = workoutProgress?.workoutCompleted === true;

  // ✅ Обновленная функция с проверкой quantity
  const calculateProgress = (exerciseProgress: number, quantity: number | undefined): number => {
    if (!quantity || quantity === 0) return 0;
    if (exerciseProgress === 0) return 0;
    
    const calculated = Math.round((exerciseProgress / quantity) * 100);
    return Math.min(100, calculated);
  };

  if (status === "loading") return <div className="mt-15">Загрузка тренировки...</div>;
  if (status === "failed") return <div className="mt-15">Ошибка: {error}</div>;
  if (!currentWorkout) return <div className="mt-15">Тренировка не найдена</div>;

  const Progress = workoutProgress?.progressData?.some((value: number) => value > 0);

  return (
    <div>
      <div className="mt-15">
        <h2 className="text-2xl md:text-6xl font-medium leading-17.5">
          {currentCourse.selectedCourse?.nameRU}
        </h2>
      </div>

      <div className="mt-10">
        <iframe
          src={currentWorkout.video}
          className="w-[343px] h-[189px] rounded-[9px] md:w-[790px] lg:w-[1160px] md:h-[435px] lg:h-[639px] md:rounded-[36px]"
          title="Workout video"
          allowFullScreen
        />
      </div>

      <div className="w-full max-w-[1160px] mt-10 p-10 rounded-[30px] bg-[#FFFFFF] shadow-2xl flex flex-col gap-5">
        <h2 className="text-[#001] text-[32px] font-normal">
          Упражнения тренировки
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {currentWorkout.exercises?.map((ex, i) => {
            const exerciseProgress = workoutProgress?.progressData?.[i] ?? 0;
            const progress = calculateProgress(exerciseProgress, ex.quantity);

            return (
              <div key={i} className="w-full flex flex-col gap-2.5">
                <div className="text-lg font-normal">
                  {`${ex.name} ${progress}%`}
                </div>
                <ProgressBar progress={progress} />
                <div className="text-xs text-gray-500 mt-1">
                  Прогресс: {exerciseProgress} / {ex.quantity || 'Нет данных'}
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-10 w-[283px] md:mx-auto">
          {isWorkoutCompleted ? 
            <ButtonGreen
              text={'Начать заново'}
              className="h-12.5 sm:w-80 text-lg w-full"
              onClick={resetProgressWorkout}
            />
            :
            <ButtonGreen
              text={Progress ? 'Обновить прогресс' : 'Заполнить прогресс'}
              className="h-12.5 sm:w-80 text-lg w-full"
              onClick={openModal}
            />
          }
        </div>

        {isOpen && (
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