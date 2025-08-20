"use client";

import ButtonGreen from "@/components/Button/ButtonGreen";
import Image from "next/image";
import { useState } from "react";
import ButtonWhite from "../Button/ButtonWhite";



export default function SignUp() {
  const [error, setError] = useState<string | null >(null);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-black/40 ">
      <div className="bg-white rounded-[30px] p-10 w-[360px]">
        <div className="h-[35px] mb-12 flex justify-center gap-2.5">
          <Image
            src="/logo.svg"
            width={220}
            height={35}
            alt="Logo"
            className="h-6 w-auto"
          />
        </div>

        <form>
          <div className="flex flex-col gap-2.5 pb-8.5">
            <input
              placeholder="Эл. почта"
              autoComplete="username"
              className="border h-[52px] rounded-[10px] px-4.5 py-4  w-full"
            />
            <input
              placeholder="Пароль"
              autoComplete="current-password"
              type="password"
              className="border h-[52px] rounded-[10px] px-4.5 py-4  w-full"
            />
            <input
              placeholder="Повторите пароль"
              autoComplete="current-password"
              type="password"
              className="border h-[52px] rounded-[10px] px-4.5 py-4  w-full"
            />
            {error && (
            <div className="w-70 h-[30px] text-[#db0030] text-[14px] font-normal flex  leading-4 text-center  px-[35px] ">
                {/* eroor */}
            </div>
            )}
          </div>
          
          <div className="flex flex-col gap-2.5">
            <ButtonGreen text="Зарегистрироваться" />
            <ButtonWhite text="Войти"/>
          </div>
        </form>
      </div>
    </div>
  );
}
