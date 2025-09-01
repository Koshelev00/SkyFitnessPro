"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchCoursesThunk} from "@/Store/features/Courses/thunk";
import Card from "@/components/Card/Card";
import Image from "next/image";
import Button from "../Button/ButtonGreen";
import Link from "next/link";
import Autch from "../Autch/Autch";

export default function MainPage() {
  const dispatch = useAppDispatch();
  const {
    courses = [],
    status,
    error,
  } = useAppSelector((state) => state.courses);

  useEffect(() => {
   
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
          <h2 className="text-[#000001] text-6xl font-medium leading-[70px]">
            Начните заниматься спортом <br /> и улучшите качество жизни
          </h2>
        </div>
        <div>
          <Image width={288} height={120} src="/message.svg" alt="message" />
        </div>
      </div>

      {/* Сетка карточек курсов */}
      <div className="grid grid-cols-3 gap-10">
        {status === "loading" && <p>Загрузка...</p>}
        {status === "failed" && <p className="text-red-500">Ошибка: {error}</p>}
        {status === "succeeded" && courses.length > 0 ? (
          courses.map((c) => <Card key={c._id} course={c} />)
        ) : status === "succeeded" ? (
          <p>Нет доступных курсов</p>
        ) : null}
      </div>

      {/* Кнопка "Наверх" */}
      <div className="justify-center mt-8.5 mb-20 flex ">
        <div className="justify-center w-32 h-13">
          <Link href={"#section1"}>
            <Button text={"Наверх ↑"} />
          </Link>
        </div>
      </div>

      {/* Блок авторизации */}
      <Autch />
    </>
  );
}
