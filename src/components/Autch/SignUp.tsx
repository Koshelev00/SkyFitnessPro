"use client";

import Button from "@/components/Button/Button";
import Image from "next/image";

export default function SignUp() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50  bg-black/40 bg-opacity-10">
      <div className="bg-white rounded-[30px] p-10 w-[360px]">
        <div className="pb-12 flex justify-center gap-2.5">
          <Image
            src="/logo.svg"
            width={18}
            height={20}
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
          </div>
          <div className="flex flex-col gap-2.5">
            <Button text="Зарегистрироваться" />
            <Button
              text="Войти"
              className="bg-white border border-black hover:bg-[#F7F7F7] active:bg-[#E9ECED] in-active:text-[#999999]"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
