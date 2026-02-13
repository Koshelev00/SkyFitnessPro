"use client";

import { formattedNameType } from "@/Types/workoutType";
import Image from "next/image";

type WorkoutProps = {
  formattedName: formattedNameType;
  completed?: boolean;
};

export default function WorkoutName({
  formattedName,
  completed = false,
}: WorkoutProps) {
  return (
    <div className="flex gap-[10px] items-center">
      <div className="w-6 h-6 flex items-center justify-center">
        {completed ? (
          <Image src="/complete.svg" alt="Completed" width={24} height={24} />
        ) : (
          <div className="w-5 h-5 rounded-full border-[1px] border-gray-300"></div>
        )}
      </div>

      <div className=" border-b border-solid border-[#C4C4C4] pb-2 w-full">
        <h3 className="font-normal text-[#000000] text-[18px] md:text-[24px]">
          {formattedName.title}
        </h3>
        {formattedName.subtitle && (
          <p className="text-[14px] md:text-[16px] text-[#000000] mt-[10px]">
            {formattedName.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
