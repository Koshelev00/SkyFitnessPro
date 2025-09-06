'use client'
import { fetchWorkoutsThunk } from "@/Store/features/Worcout/thunk";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { RootState } from "@/Store/store";
import { CourseWorkoutsType } from "@/Types/courseType";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type WorkoutProps = {
    workouts: CourseWorkoutsType;
  };
export default function WorkoutName({workouts }: WorkoutProps){
    // const params = useParams<{ workoutId: string;}>();
    // console.log(params)
//    const workoutId = params?.workoutId;
//     const { workouts } = useAppSelector((state: RootState) => state.workouts);
//     const dispatch = useAppDispatch();
  
 

    return(
        <div className="flex gap-[10px] items-center">
        <div className="w-5 h-5 rounded-4xl border-[1px]">

        </div>
        <div className="cursor-pointer border-b-1 border-solid border-[#C4C4C4]" key={w._id}> {w.name} </div>
      </div>

    )
}