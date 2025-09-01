"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { fetchCourseByIdThunk, addUserCourseThunk } from "@/Store/features/Courses/thunk";
import Image from "next/image";
import ButtonGreen from "../Button/ButtonGreen";


type CourseProps = {
  courseId: string;
};

export default function Course({ courseId }: CourseProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentCourse, status } = useSelector(
    (state: RootState) => state.courses
  );
  const { isAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseByIdThunk(courseId));
    }
  }, [courseId, dispatch]);

  const handleAddCourse = () => {
    if (!isAuth) return;
    dispatch(addUserCourseThunk(courseId));
  };

  if (status === "loading") return <p>Загрузка...</p>;
  if (!currentCourse) return <p>Курс не найден</p>;

  return (
    <div className="mb-12.5 overflow-hidden bg-[#FAFAFA]">
      {/* 🔹 Обложка */}
      <div className="mt-15">
        <Image
          width={1160}
          height={310}
          src={`/image/skillCard/${currentCourse.nameEN}.jpg`}
          alt={"SkillCard"}
        />
      </div>

      {/* 🔹 Блок "Подойдет для вас, если:" */}
      <div className="mt-15">
        <h3 className="text-[40px] font-semibold text-[#00001]">Подойдет для вас, если:</h3>
        <div className="flex gap-[17px] mt-10">
          {currentCourse.fitting.map((fit: string, index: number) => (
            <div
              key={index}
              className={`h-[141px] flex items-center bg-cover bg-center`}
              style={{
                width: index === 0 ? "368px" : index === 1 ? "431px" : "327px",
                backgroundImage: `url('/image/Frame${index + 1}.jpg')`,
              }}
            >
              <div className="ml-20 mr-5">
                <h3 className="text-[#FFFFFF] text-[20px] font-normal leading-7">{fit}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 Блок "Направления" */}
      <div className="mt-15 mb-[102px]">
        <h3 className="text-[40px] font-semibold text-[#00001]">Направления</h3>
        <div className="w-[1160px] bg-[#BCEC30] rounded-[28px] mt-10 p-[30px] grid grid-cols-3 gap-y-[34px]">
          {currentCourse.directions.map((direction, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Image width={26} height={26} src="/Sparcle.svg" alt="Sparcle" />
              <p className="text-[24px] font-normal leading-7">{direction}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 🔹 CTA блок */}
      <div className="flex shadow-2xl bg-[#FFFFFF] p-10 rounded-[30px] ">
        <div className="w-[437px] pb-10">
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
            <ButtonGreen
              text={isAuth ? "Добавить курс" : "Войдите, чтобы добавить курс"}
              className=" "
              onClick={handleAddCourse}
            />
          </div>
        </div>

        <div className="relative w-[710px]">
          <div className="absolute right-[110px] bottom-[5px] w-[590px] h-[592px] translate-y-10">
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
