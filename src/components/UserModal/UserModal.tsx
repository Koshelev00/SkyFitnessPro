"use client";

import ButtonGreen from "../Button/ButtonGreen";
import ButtonWhite from "../Button/ButtonWhite";
import {
  clearUser,
  closeModalUser,
  setIsAuth,
} from "@/Store/features/Autch/autchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/Store/store";
import { useEffect, useRef } from "react";

export default function UserModal() {
  const { isOpened, email } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(clearUser());
    dispatch(setIsAuth(false));
    router.push("/");
    dispatch(closeModalUser());
  };

  const handleProfileClick = () => {
    router.push("/profile");
    dispatch(closeModalUser());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        dispatch(closeModalUser());
      }
    };

    if (isOpened) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpened, dispatch]);

  if (!isOpened) return null;

  return (
    <div
      ref={modalRef}
      className="bg-[#FFFFFF] rounded-[30px] w-[266px] h-[258px] flex flex-col gap-[57px] p-[30px] absolute z-10 top-[55px] right-[0px]"
    >
      <span className="text-[18px] text-[#999999] font-normal">
        {email ?? ""}
      </span>
      <div className="flex flex-col gap-[10px] w-[206px] h-[114px]">
        <ButtonGreen text="Мой профиль" onClick={handleProfileClick} />
        <ButtonWhite text="Выйти" onClick={handleLogout} />
      </div>
    </div>
  );
}
