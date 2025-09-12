import { WorkoutExerciseType } from "@/Types/workoutType";
import ButtonGreen from "../Button/ButtonGreen";
import ProgressExercise from "./ProgressExercise";
import { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchWorkoutProgressThunk, saveWorkoutProgressThunk } from "@/Store/features/Progress/thunk";
import { closeModalWorkout, openModalCompleted } from "@/Store/features/Worcout/workoutSlice";

type AddProgressModalProps = {
  exercises: WorkoutExerciseType[];
  workoutId: string;
  courseId: string;
};

export default function AddProgressModal({
  exercises,
  workoutId,
  courseId,
}: AddProgressModalProps) {
  const dispatch = useAppDispatch();
  const [progressInputs, setProgressInputs] = useState<(number | undefined)[]>([]);
  const workout = useAppSelector((state) => state.workouts.currentWorkout);
  const [initialProgress, setInitialProgress] = useState<number[]>([]);
  
  const currentProgress = useAppSelector((state) => 
    state.progress.workoutProgress?.progressData || []
  );

  // Используем useCallback для мемоизации функции
  const initializeProgress = useCallback(() => {
    if (JSON.stringify(initialProgress) !== JSON.stringify(currentProgress)) {
      setInitialProgress(currentProgress);
      // Инициализируем progressInputs пустыми значениями
      setProgressInputs(new Array(exercises.length).fill(undefined));
    }
  }, [currentProgress, initialProgress, exercises.length]);

  useEffect(() => {
    initializeProgress();
  }, [initializeProgress]);

  const handleInputChange = (index: number, value: string) => {
    const updated = [...progressInputs];
    updated[index] = value === '' ? undefined : Math.max(0, Number(value));
    setProgressInputs(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!courseId || !workoutId) return;

    const progressData = workout?.exercises?.map((_, i) => {
      const inputValue = progressInputs[i];
      const currentValue = initialProgress[i] || 0;
      
      return inputValue !== undefined 
        ? currentValue + inputValue
        : currentValue;
    });

    try {
      if (progressData) {
        await dispatch(saveWorkoutProgressThunk({ 
          courseId, 
          workoutId, 
          progressData 
        })).unwrap();

        const token = localStorage.getItem("authToken");
        
        dispatch(closeModalWorkout());
        dispatch(openModalCompleted());
        
        if (token) {
          dispatch(fetchWorkoutProgressThunk({ 
            courseId, 
            workoutId, 
            token 
          }));
        }
      }
    } catch (error) {
      console.log("Ошибка сохранения прогресса:", error);
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-[30px] p-10 w-[343px] h-[585px] md:w-[426px] md:h-[595px] shadow-lg flex flex-col gap-[34px] md:gap-12">
          <div className="h-[35px]">
            <h2 className="text-[32px] text-[#000000] font-normal">Мой прогресс</h2>
          </div>
          <div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col pr-5 w-[346px] h-[432px] gap-[34px]"
            >
              <div className="flex flex-col gap-5 pb-6 w-[263px] h-[337px] md:w-[346px] md:h-[346px] 
                overflow-x-hidden 
                [&::-webkit-scrollbar]:w-1.5         
                [&::-webkit-scrollbar-track]:rounded-2xl  
                [&::-webkit-scrollbar-thumb]:h-29 
                [&::-webkit-scrollbar-track]:bg-[#F7F7F7]
                [&::-webkit-scrollbar-thumb]:rounded-2xl
                [&::-webkit-scrollbar-thumb]:bg-[#000000]">
                {exercises.map((ex, i) => (
                  <div key={i} className="flex flex-col gap-[10px] ">
                    <label className="text-[16px] w-[237px] md:text-lg md:w-[320px] font-normal leading-[110%]">
                      Сколько раз вы сделали {ex.name}?
                    </label>
                    <ProgressExercise
                      type="number"
                      placeholder={(initialProgress[i] ?? 0).toString()}
                      min="0"
                      value={progressInputs[i] ?? ''}
                      onChange={(e) => handleInputChange(i, e.target.value)}
                    />
                  </div>
                ))}
              </div>
              <div className="w-[263px] md:w-[346px]">
                <ButtonGreen type="submit" text={"Сохранить прогресс"}/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}