import { useEffect, useRef } from "react";
import ButtonGreen from "../Button/ButtonGreen";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchWorkoutsThunk } from "@/Store/features/Worcout/thunk";
import { RootState } from "@/Store/store";

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
      <div className=" flex items-center justify-center  ">
        <div
          className="w-[460px] h-[609px] p-10 bg-[#FFFFFF] rounded-[30px] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-22 flex items-center text-center">
            <h2 className="text-[#000000] text-[32px] font-normal">
              Выберите тренировку
            </h2>
          </div>
          <div className="w-[380px] h-[380px] mb-[34px]">
            <div className="w-[354px] border-b-2 border-solid border-[#C4C4C4] mr-5">
              {workouts.map((w) => (
                <div key={w._id}> {w.name} </div>
              ))}
            </div>
          </div>
          <div>
            <ButtonGreen text="Начать" />
          </div>
        </div>
      </div>
    </>
  );
}
