'use client'
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchWorkoutByIdThunk } from "@/Store/features/Worcout/thunk";
import { fetchWorkoutProgressThunk, resetWorkoutProgressThunk } from "@/Store/features/Progress/thunk";
import AddProgressModal from "../AddProgressModal/AddProgressModal";
import ButtonGreen from "../Button/ButtonGreen";
import ProgressBar from "../ProgressBar/ProgressBar";
import { openModalWorkout } from "@/Store/features/Worcout/workoutSlice";
import AddCompleted from "../AddProgressModal/AddСompleted";

type WorkoutProps = {
  workoutId: string;
  courseId: string;
};

export default function Workout({ workoutId, courseId }: WorkoutProps) {
  const dispatch = useAppDispatch();
  
  const isOpen = useAppSelector((state) => state.workouts.isOpen);
  const Open = useAppSelector((state)=>state.workouts.Open)
  const { currentWorkout, status, error } = useAppSelector((state) => state.workouts);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(fetchWorkoutByIdThunk({ workoutId, token }));
    }
  }, [dispatch, workoutId]);
const token = localStorage.getItem("authToken");
  useEffect(() => {
    
    if (token) {
      dispatch(fetchWorkoutProgressThunk({ courseId, workoutId, token }));
    }
  }, [dispatch, courseId, workoutId]);

  const openModal = () => {
    dispatch(openModalWorkout());
  };
  
  const resetProgressWorkout= () =>{
    dispatch( resetWorkoutProgressThunk({courseId, workoutId}))
     if (token) {
          dispatch(fetchWorkoutProgressThunk({ 
            courseId, 
            workoutId, 
            token 
          }));
        }
  }
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
        <h2 className="text-6xl font-medium leading-17.5">
          {currentWorkout.name}
        </h2>
      </div>

      <div className="mt-10">
        <iframe
          src={currentWorkout.video}
          className="w-[1160px] h-[639px] rounded-[36px]"
          title="Workout video"
          allowFullScreen
        />
      </div>

      <div className="w-[1160px] mt-10 p-10 rounded-[30px] bg-[#FFFFFF] shadow-2xl flex flex-col gap-5">
        <h2 className="text-[#001] text-[32px] font-normal">
          Упражнения тренировки
        </h2>

        <div className="grid grid-cols-3 gap-5">
          {currentWorkout.exercises?.map((ex, i) => {
            const exerciseProgress = workoutProgress?.progressData?.[i] ?? 0;
            
            
            const progress = calculateProgress(exerciseProgress, ex.quantity);

            return (
              <div key={i} className="w-full">
                <div className="pb-2.5 text-lg font-normal">
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

        <div className="pt-10 mx-auto">
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
        {Open &&
        <AddCompleted />
}
      </div>
    </div>
  );
}