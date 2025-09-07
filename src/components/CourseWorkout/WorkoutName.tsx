'use client'
import { CourseWorkoutsType } from "@/Types/courseType";

type WorkoutProps = {
  workout: CourseWorkoutsType;
};

export default function WorkoutName({ workout }: WorkoutProps) {
  return (
    <div className="flex gap-[10px] items-center">
      <div className="w-5 h-5 rounded-4xl border-[1px]"></div>
      <div className="cursor-pointer border-b-1 border-solid border-[#C4C4C4]">
        {workout.name}
      </div>
    </div>
  );
}