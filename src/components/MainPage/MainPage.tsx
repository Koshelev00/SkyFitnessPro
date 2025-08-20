"use client";

import Card from "@/components/Card/Card";
import Image from "next/image";
import Button from "../Button/ButtonGreen";
import SignUp from "../Autch/SignUp";
import SignIn from "../Autch/SignIn";

export default function MainPage() {
  const token=  localStorage.getItem('authToken');
  console.log(token)
  return (
    <>
      <div className="flex justify-between mt-15 mb-12.5 relative">
        <div className="">
          <h2 className="text-[#000001] text-6xl font-medium leading-[70px]">
            Начните заниматься спортом <br /> и улучшите качество жизни
          </h2>
        </div>
        <div className="w-">
          <Image
            width={288}
            height={120}
            className=""
            src="/message.svg"
            alt={"message"}
          />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
      <div className="justify-center mt-8.5 mb-20 flex ">
        <div className="justify-center  w-32 h-13 ">
          <Button text={"Наверх ↑"} className="" />
        </div>
      </div>

      <SignIn />
    </>
  );
}
