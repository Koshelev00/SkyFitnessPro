'use client'

import { formattedNameType } from "@/Types/workoutType";

type WorkoutProps = {
  formattedName: formattedNameType;
};

export default function WorkoutName({formattedName }: WorkoutProps) {
  return (
    <div className="flex gap-[10px] items-center">
      <div className="w-6 h-6 flex items-center">
        <div className="w-5 h-5 rounded-full border-[1px] border-gray-300"></div>
      </div>
      <div className="cursor-pointer border-b border-solid border-[#C4C4C4] pb-2 w-full">
        <h3 className="font-normal text-[#000000] text-[18px] md:text-[24px]">
          {formattedName.title}
        </h3>
        {formattedName.subtitle && (
          <p className="text-[14px]  md:text-[16px] text-[#000000] mt-[10px]">
            {formattedName.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}