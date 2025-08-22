"use client";

import Image from "next/image";
import Button from "../Button/ButtonGreen";

export default function Course() {
  return (
    <div className="mb-12.5 overflow-hidden bg-[#FAFAFA]">
      <div className="mt-15">
        <Image
          width={1160}
          height={310}
          className=""
          src="/image/skillCard/skillCardYoga.jpg"
          alt={"SkillCard "}
        />
      </div>
      <div className="mt-15">
        <h3 className="text-[40px] font-semibold text-[#00001]">
          Подойдет для вас, если:
        </h3>
        <div className="flex gap-[17px] mt-10">
          <Image
            width={368}
            height={141}
            className=""
            src="/image/Frame1.jpg"
            alt={"Frame1"}
          />
          <Image
            width={431}
            height={141}
            className=""
            src="/image/Frame2.jpg"
            alt={"Frame2"}
          />
          <Image
            width={327}
            height={141}
            className=""
            src="/image/Frame3.jpg"
            alt={"Frame3"}
          />
        </div>
      </div>
      <div className="mt-15 mb-[102px]">
        <h3 className="text-[40px] font-semibold text-[#00001]">Направления</h3>
        <Image
          width={1160}
          height={146}
          className="mt-10"
          src="/image/Directions.jpg"
          alt={"FDirections"}
        />
      </div>
      <div className="flex shadow-2xl bg-[#FFFFFF] p-10 rounded-[30px] ">
        <div className="w-[437px] pb-10  ">
          <h2 className="text-6xl font-medium leading-17.5 text-[#001]">
            Начните путь к новому телу
          </h2>
          <ul className="list-disc list-inside text-2xl font-normal text-gray-800 space-y-1 opacity-60 mt-7 mb-7">
            <li>проработка всех групп мышц</li>
            <li>тренировка суставов</li>
            <li>улучшение циркуляции крови</li>
            <li>упражнения заряжают бодростью</li>
            <li>помогают противостоять стрессам</li>
          </ul>
          <div className="w-[437px] h-[52px]">
            <Button text={"Войдите, чтобы добавить курс"} className=" " />
          </div>
        </div>
        <div className="relative w-[710px] ">
          <div className="absolute right-[110px] bottom-[5px] w-[590px] h-[592px] translate-y-10 -translate-x-0">
            <Image
              src="/sportsmen.svg"
              alt="sportsmen"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
