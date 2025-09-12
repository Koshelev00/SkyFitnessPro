"use client";

import Link from "next/link";
import Image from "next/image";
import { CourseType } from "@/Types/courseType";
import { useAppDispatch } from "@/Store/hooks"; 
import { addUserCourseThunk } from "@/Store/features/Courses/thunk"; 
import { RootState } from "@/Store/store";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserProfileThunk } from "@/Store/features/Autch/thunk";

interface CardProps {
  course: CourseType;
  token: string;
}

export default function Card({ course, token }: CardProps) {
  const dispatch = useAppDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isAdding, setIsAdding] = useState(false);

  // Загружаем профиль пользователя только один раз при монтировании
  useEffect(() => {
    if (token) {
      dispatch(getUserProfileThunk(token));
    }
  }, [dispatch, token]); // Добавляем user в зависимости

  const handleAddCourse = async () => {
    if (isAdding || !token) return;
    
    setIsAdding(true);
    try {
      await dispatch(addUserCourseThunk(course._id));
      // После успешного добавления обновляем профиль
      dispatch(getUserProfileThunk(token));
    } catch (error) {
      console.error("Ошибка при добавлении курса:", error);
    } finally {
      setIsAdding(false); // Исправлено: устанавливаем false
    }
  };

  // Проверяем, есть ли текущий курс в выбранных пользователем
  const isCourseSelected = user?.selectedCourses?.includes(course._id);
  const showAddButton = !isCourseSelected && !isAdding && token;

  return (
    <div className="relative w-[343px] h-[492px] bg-[#FFFFFF] rounded-[30px] shadow-2xl sm:w-[360px] sm:h-[501px]">
      
      {showAddButton && (
        <Image
          width={32}
          height={32}
          className="absolute right-5.5 top-5.5 cursor-pointer"
          src="/Circle.svg"
          alt={"Добавить курс"}
          onClick={handleAddCourse}
        />
      )}
      
      {isAdding && (
        <div className="absolute right-5.5 top-5.5">
          <div className="w-8 h-8 border-2 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className="mb-8">
        <Link href={`/course/${course._id}`}>
          <Image
            width={343}
            height={325}
            className="sm:w-[360px]"
            src={`/image/${course.nameEN}.png`}
            alt={course.nameRU}
          />
        </Link>
      </div>
      
      <div className="mx-7.5">
        <h2 className="text-[#001] text-[32px] font-medium leading-9.5">
          {course.nameRU}
        </h2>
        
        <div className="flex gap-1.5 mt-5">
          <div className="flex bg-[#F7F7F7] w-[103px] h-[38px] rounded-[50px] p-2.5 gap-1.5">
            <Image width={18} height={18} src="/Calendar.svg" alt="calendar" />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px]">
              {course.durationInDays ?? 0} дней
            </span>
          </div>
          
          <div className="flex bg-[#F7F7F7] w-[163px] h-[38px] rounded-[50px] p-2.5 gap-1.5">
            <Image width={18} height={18} src="/Time.svg" alt="time" />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px]">
              {(course.dailyDurationInMinutes?.from ?? 0)}-
              {(course.dailyDurationInMinutes?.to ?? 0)} мин/день
            </span>
          </div>
        </div>
        
        <div>
          <div className="flex bg-[#F7F7F7] w-[129px] h-[38px] rounded-[50px] p-2.5 gap-1.5 mt-1.5">
            <Image width={18} height={18} src="/signal-fill.svg" alt="signal" />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px]">
              {course.difficulty ?? "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}