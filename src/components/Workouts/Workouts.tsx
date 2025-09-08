import Button from "../Button/ButtonGreen";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchWorkoutByIdThunk } from "@/Store/features/Worcout/thunk";
import { fetchWorkoutProgressThunk } from "@/Store/features/Progress/thunk";
import AddProgressModal from "../AddProgressModal/AddProgressModal";

type WorkoutProps = {
  workoutId: string;
  courseId: string;
};
export default function Workout( {workoutId, courseId}: WorkoutProps) {
  const dispatch = useAppDispatch();
  
 

  const { currentWorkout, status, error } = useAppSelector((state) => state.workouts);

  useEffect(() => {
    const token=localStorage.getItem("authToken")
    console.log(token)
    
    if(token){
      dispatch(fetchWorkoutByIdThunk({workoutId, token}));
    }

    
  }, [dispatch]);
  
  
  useEffect(() => {
    const token=localStorage.getItem("authToken")
    console.log(token)
    
    if(token){
      dispatch(fetchWorkoutProgressThunk ({courseId, workoutId, token}));
    }
    

    
    
    
  }, [dispatch]);


  if (status === "loading") {
    return <div className="mt-15">Загрузка тренировки...</div>;
  }

  if (status === "failed") {
    return <div className="mt-15">Ошибка: {error}</div>;
  }

  if (!currentWorkout) {
    return <div className="mt-15">Тренировка не найдена</div>;
  }

  return (
    <div>
      <div className="mt-15">
        <h2 className="text-6xl font-medium leading-17.5 ">
          {currentWorkout.name}
        </h2>
      </div>

      <div className="mt-10">
        <iframe
          src={currentWorkout.video}
          className="w-[1160px] h-[639px] rounded-[36px]"
        ></iframe>
      </div>

      <div className="w-[1160px] mt-10 p-10 rounded-[30px] bg-[#FFFFFF] shadow-2xl flex flex-col gap-5 ">
        <h2 className="text-[#001] text-[32px] font-normal ">
          Упражнения тренировки
        </h2>

        {/* Сетка упражнений */}
        <div className="grid grid-cols-3  gap-5 ">
          {currentWorkout.exercises?.map((exercise) => (
            <div key={exercise._id} className="text-4.5 w-[320px] h-[60px]">
              <p>
                {exercise.name} %
              </p>
              <div className="w-[320px] h-[6px] bg-gray-200 rounded mt-2.5">
                <div
                  className="h-[6px] w-[320px] bg-[#00C1FF] rounded-[50px]"
                  style={{ width: `%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[270px] h-[20px] mt-10 mb-10">
          <Button text={"Заполнить свой прогресс"} className="" />
        </div>
        <AddProgressModal exercises={currentWorkout.exercises}  workoutId={workoutId} courseId={courseId} />
      </div>
    </div>
  );
}
