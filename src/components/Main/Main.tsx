"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchCoursesThunk} from "@/Store/features/Courses/thunk";
import Card from "@/components/Card/Card";
import Image from "next/image";
import Link from "next/link";
import Autch from "../Autch/Autch";
import { useSelector } from "react-redux";
import { RootState } from "@/Store/store";

export default function Main() {
  const {user } = useSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const {
    courses = [],
    status,
    error,
  } = useAppSelector((state) => state.courses);
  const [token, setToken] = useState<string | null>(null);

 

  useEffect(() => {
      setToken(localStorage.getItem("authToken"));
   
      dispatch(fetchCoursesThunk());
    
  }, []);


  return (
    <>
      {/* Верхний блок с текстом и картинкой */}
      <div
        className="flex justify-between mt-15 mb-12.5 relative"
        id="section1"
      >
        <div>
          <h2 className="text-[#000001] text-[32px] font-medium  md:text-6xl md:leading-[70px]">
            Начните заниматься спортом  и улучшите качество жизни
          </h2>
        </div>
        <div className="hidden md:block">
          <Image width={288} height={120} src="/message.svg" alt="message" />
        </div>
      </div>

      {/* Сетка карточек курсов */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2  xl:grid-cols-3">
        {status === "loading" && <p>Загрузка...</p>}
        {status === "failed" && <p className="text-red-500">Ошибка: {error}</p>}
        {status === "succeeded" && courses.length > 0 ? (
      
          courses.map((c) => <Card key={c._id} course={c} token={token} />)
        ) : status === "succeeded" ? (
          <p>Нет доступных курсов</p>
        ) : null}
      
      </div>

      {/* Кнопка "Наверх" */}
      <div className="justify-end mt-8.5 mb-20 flex ">
        <div className=" w-32 h-13">
          <Link href={"#section1"} className="px-5 py-2  h-[52px] w-full rounded-full text-black font-normal duration-200 bg-[#BCEC30] hover:bg-[#C6FF00]  cursor-pointer active:bg-[#000000] active:text-[#FFFFFF] flex items-center justify-center ">
            Наверх ↑
          </Link>
        </div>
      </div>

      {/* Блок авторизации */}
      <Autch />
    </>
  );
}
