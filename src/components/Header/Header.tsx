'use client';

import Link from "next/link";
import Image from "next/image";
import { openModal } from "@/Store/features/autchSlice";
import { useDispatch } from 'react-redux';
import ButtonGreen from "../Button/ButtonGreen";
export default function Header() {
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal()); 
  };

  return (
    <div className=" flex  justify-between align-baseline mt-12.5 ">
      <div className="">
        <Link href="#">
          <Image
            width={220}
            height={35}
            className={"logo__image"}
            src="/logo.svg"
            alt={"logo"}
          />
          <div className="text-gray-500 opacity-[0.5] text-lg font-normal leading-[21px] w-[327px]">
            Онлайн-тренировки для занятий дома
          </div>
        </Link>
      </div>
      <div className="w-26 h-13">
        <ButtonGreen text={"Войти"} onClick={handleOpenModal}/>
      </div>
      
    </div>
  );
}
