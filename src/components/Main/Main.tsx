"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchCoursesThunk } from "@/Store/features/Courses/thunk";
import { getUserProfileThunk } from "@/Store/features/Autch/thunk";
import Card from "@/components/Card/Card";
import Image from "next/image";
import Link from "next/link";
import Autch from "../Autch/Autch";

interface Toast {
  id: number;
  message: string;
  visible: boolean;
}

export default function Main() {
  const dispatch = useAppDispatch();
  const {
    courses = [],
    status,
    error,
  } = useAppSelector((state) => state.courses);
  const { user } = useAppSelector((state) => state.auth);
  const [token, setToken] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastId, setToastId] = useState(0);

  const addToast = (message: string) => {
    const id = toastId + 1;
    setToastId(id);
    setToasts((prev) => [...prev, { id, message, visible: true }]);
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, visible: false } : t)),
      );
      setTimeout(
        () => setToasts((prev) => prev.filter((t) => t.id !== id)),
        800,
      );
    }, 2000);
  };

  useEffect(() => {
    const authToken =
      typeof window !== "undefined" ? localStorage.getItem("authToken") : null;
    setToken(authToken);
    dispatch(fetchCoursesThunk());
    if (authToken) {
      dispatch(getUserProfileThunk(authToken));
    }
  }, [dispatch]);

  return (
    <>
      <div
        className="flex justify-between mt-15 mb-12.5 relative"
        id="section1"
      >
        <div>
          <h2 className="text-[#000001] text-[32px] font-medium md:text-6xl md:leading-[70px]">
            Начните заниматься спортом{" "}
            <span className="hidden md:inline">
              <br />
            </span>{" "}
            и улучшите качество жизни
          </h2>
        </div>
        <div className="relative w-[288px] h-[120px] hidden md:block">
          <Image
            src="/message.svg"
            alt="message"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        {status === "loading" && <p>Загрузка...</p>}
        {status === "failed" && <p className="text-red-500">Ошибка: {error}</p>}
        {status === "succeeded" && courses.length > 0 ? (
          courses.map((c) => (
            <Card
              key={c._id}
              course={c}
              token={token || undefined}
              addToast={addToast}
              userSelectedCourses={user?.selectedCourses || []}
            />
          ))
        ) : status === "succeeded" ? (
          <p>Нет доступных курсов</p>
        ) : null}
      </div>

      <div className="justify-end md:justify-center mt-8.5 mb-20 flex">
        <div className="w-32 h-13">
          <Link
            href="#section1"
            className="px-5 py-2 h-[52px] w-full rounded-full text-black font-normal duration-200 bg-[#BCEC30] hover:bg-[#C6FF00] cursor-pointer active:bg-[#000000] active:text-[#FFFFFF] flex items-center justify-center"
          >
            Наверх ↑
          </Link>
        </div>
      </div>

      <div className="fixed top-5 left-1/2 -translate-x-1/2 flex flex-col gap-4 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`bg-[#BCEC30] text-[#000000] w-60 px-2 py-4 rounded-xl text-2xl flex items-center justify-center shadow-lg transition-all duration-500
              ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
          >
            {toast.message}
          </div>
        ))}
      </div>

      <Autch />
    </>
  );
}
