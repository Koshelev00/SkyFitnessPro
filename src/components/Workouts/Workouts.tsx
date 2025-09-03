import Button from "../Button/ButtonGreen";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchWorkoutByIdThunk } from "@/Store/features/Worcout/thunk";

export default function Workout() {
  const dispatch = useAppDispatch();
  const params = useParams<{ workoutId: string; courseId: string }>();
  const workoutId = params?.workoutId;
  const courseId = params?.courseId;

  const { currentWorkout, status, error } = useAppSelector((state) => state.workouts);

  useEffect(() => {
    if (workoutId) {
      dispatch(fetchWorkoutByIdThunk(workoutId));
    }
  }, [dispatch, workoutId]);

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
          src={currentWorkout.videoUrl || "https://www.youtube.com/embed/Ewm-Bfg5ncg"}
          className="w-[1160px] h-[639px] rounded-[36px]"
        ></iframe>
      </div>

      <div className="mt-10 rounded-[30px] bg-[#FFFFFF] shadow-2xl p-10">
        <h2 className="text-[#001] text-[32px] font-normal ">
          Упражнения тренировки
        </h2>

        {/* Сетка упражнений */}
        <div className="grid grid-cols-3 mt-5 gap-15">
          {currentWorkout.exercises?.map((exercise) => (
            <div key={exercise.id} className="text-4.5 mb-6">
              <p>
                {exercise.name} {exercise.progress}%
              </p>
              <div className="w-[320px] h-[6px] bg-gray-200 rounded mt-2.5">
                <div
                  className="h-[6px] bg-green-500 rounded"
                  style={{ width: `${exercise.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-[270px] h-[20px] mt-10 mb-10">
          <Button text={"Заполнить свой прогресс"} className="" />
        </div>
      </div>
    </div>
  );
}
