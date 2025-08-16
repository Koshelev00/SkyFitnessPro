'use client';

import Card from "@/components/Card/Card";
import Image from "next/image";


// import { TrackType } from '@/sharedTypes/sharedTypes';


export default function Centerblock(){
  return (
    <>
    <div className="flex justify-between mt-15 mb-12.5 ">
      <div className="">
<h2 className="text-[#000001] text-6xl font-medium leading-[70px]">Начните заниматься спортом <br/> и улучшите качество жизни</h2>
      </div>
      <div className="">
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
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    <Card/>
    </div>

    <div className="flex justify-center mt-8.5 mb-20">
      <button className="w-32 h-13 bg-[#BCEC30] justify-center gap-2 py-4 px-6.5 rounded-[46px] cursor-pointer text-[18px] font-normal leading-5 ">Наверх ↑</button>
    </div>

     
   
    </>
  );
}
