import { useEffect } from "react";
import ButtonGreen from "../Button/ButtonGreen";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchWorkoutsThunk } from "@/Store/features/Worcout/thunk";
import { RootState } from "@/Store/store";
import WorkoutName from "./WorkoutName";
import Link from "next/link";
import formatWorkoutName from "@/Utilite/formatWorkoutName";

type CourseWorkoutProps = {
  courseId: string;
};

const getLessonNumber = (name: string): number | null => {
  const match = name.match(/(Урок\s*)?(\d+)/);
  if (match && match[2]) {
    return parseInt(match[2], 10);
  }
  return null;
};

export default function CourseWorkout({ courseId }: CourseWorkoutProps) {
  const { workouts } = useAppSelector((state: RootState) => state.workouts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(fetchWorkoutsThunk({ courseId, token }));
    }
  }, [dispatch, courseId]);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    const numA = getLessonNumber(a.name) || 0;
    const numB = getLessonNumber(b.name) || 0;
    return numA - numB;
  });

  return (
    <div className="mt-[20%] ml-[30%]">
      <div
        className="w-[460px] p-10 bg-[#FFFFFF] rounded-[30px] relative flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-12 flex items-center">
          <h2 className="text-[#000000] text-[32px] font-normal text-center">
            Выберите тренировку
          </h2>
        </div>
        <div className="w-[380px] mb-[34px]">
          <div
            className="w-[380px] h-[360px]  overflow-x-hidden 
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
                  return (
                    <Link
                      href={`/courseWorkout/${courseId}/${workout._id}`}
                      key={workout._id}
                    >
                      <div className="w-[354px] mr-5">
                        <WorkoutName
                          workout={workout}
                          formattedName={formattedName}
                        />
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="w-[380px] h-[52px]">
          <ButtonGreen text="Начать" />
        </div>
      </div>
    </div>
  );
}
