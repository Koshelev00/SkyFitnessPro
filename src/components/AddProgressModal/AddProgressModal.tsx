import { WorkoutExerciseType } from "@/Types/workoutType";
import ButtonGreen from "../Button/ButtonGreen";
import ProgressExercise from "./ProgressExercise";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { saveWorkoutProgressThunk } from "@/Store/features/Progress/thunk";

type AddProgressModalProps = {
  exercises: WorkoutExerciseType[];
  workoutId: string;
  courseId:string;
  
//   onClose: () => void;
//   onSubmit: (progressData: number[]) => void;
};
export default function AddProgressModal({
  exercises,
  workoutId,
  courseId,
//    onSubmit,
}: AddProgressModalProps) {
  const dispatch = useAppDispatch();
    const [progressInputs, setProgressInputs] = useState<(number | undefined)[]>([]);
    const workout = useAppSelector((state) => state.workouts.currentWorkout);
    const [initialProgress, setInitialProgress] = useState<number[]>([]);
    
    const handleInputChange = (index: number, value: string) => {
    const updated = [...progressInputs];
    updated[index] = value === '' ? undefined : Math.max(0, Number(value));
    setProgressInputs(updated);
  };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!courseId || !workoutId) return;
    const progressData =workout?.exercises?.map((_, i) => {
        const inputValue = progressInputs[i];
        return inputValue !== undefined ? inputValue : (initialProgress[i] ?? 0);
      });
      try {
        if(progressData){
        await  dispatch(saveWorkoutProgressThunk ({courseId,  workoutId, progressData})).unwrap();
        }
      } catch(error){
        console.log("Ошшибка сохранения прогресса:", error);
      }
  };

    

    return(
        <>
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-[30px] p-10 w-[426px] max-h-[595px] shadow-lg flex flex-col gap-12">
            <div className="h-[35px]">
                <h2 className="text-[32px] text-[#000000] font-normal" >Мой прогресс</h2>
            </div>
            <div>
        <form
           onSubmit={handleSubmit}
          className="flex flex-col pr-5  w-[346px] h-[432px] gap-[34px]"
        >
          <div className="flex flex-col gap-5 pb-6 w-[346px] h-[346px] overflow-x-hidden 
          [&::-webkit-scrollbar]:w-1.5         
          [&::-webkit-scrollbar-track]:rounded-2xl  
          [&::-webkit-scrollbar-thumb]:h-29 
        [&::-webkit-scrollbar-track]:bg-[#F7F7F7]
          [&::-webkit-scrollbar-thumb]:rounded-2xl
        [&::-webkit-scrollbar-thumb]:bg-[#000000]
 ">
            {exercises.map((ex, i) => (
              <div key={i} className="flex flex-col gap-[10px] ">
                <label className="text-lg w-[320px] font-normal leading-[110%]">
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
             <div className="w-[346px]">
              <ButtonGreen type="submit"  text={"Сохранить"}/>
             </div>
        </form>
               
            </div>

        </div>

        </div>
        
        </>
    )
}