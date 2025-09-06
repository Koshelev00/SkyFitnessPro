import { useEffect, useRef } from "react";
import ButtonGreen from "../Button/ButtonGreen";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchWorkoutsThunk } from "@/Store/features/Worcout/thunk";
import { RootState } from "@/Store/store";
import WorkoutName from "./WorkoutName";

type WorkoutProps = {
  courseId: string;
};

export default function CourseWorkout({ courseId }: WorkoutProps) {
  const { workouts } = useAppSelector((state: RootState) => state.workouts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      dispatch(fetchWorkoutsThunk({ courseId, token }));
      
    }
  }, [dispatch, courseId]);
  // const filteredWorkouts = workouts.filter(
  //   (workout) => workout.courseId === courseId || workout.course === courseId
  // );

  return (
    <>
      <div className=" mt-[20%] ml-[30%]">
        <div
          className="w-[460px] p-10 bg-[#FFFFFF] rounded-[30px] relative flex flex-col items-center justify-center "
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-12 flex items-center ">
            <h2 className="text-[#000000] text-[32px] font-normal text-center">
              Выберите тренировку
            </h2>
          </div>
          <div className="w-[380px] h-max-[360px] mb-[34px]">
            <div className="w-[354px]  mr-5 flex flex-col gap-[10px]" >
              {workouts.map((w) => (
                <WorkoutName key= "" workouts= {w}/>
              ))}
            </div>
          </div>
          <div className="w-[380px] h-[52px]">
            <ButtonGreen text="Начать" />
          </div>
        </div>
      </div>
    </>
  );
}
