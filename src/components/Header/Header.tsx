"use client";

import Link from "next/link";
import Image from "next/image";
import {
  openModal,
  openModalUser,
  closeModalUser,
  setIsAuth,
} from "@/Store/features/Autch/autchSlice";
import { useDispatch, useSelector } from "react-redux";
import ButtonGreen from "../Button/ButtonGreen";
import { useState, useEffect } from "react";
import { RootState } from "@/Store/store";
import UserModal from "../UserModal/UserModal";

export default function Header() {
  const dispatch = useDispatch();
  const [token, setToken] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const {isOpened } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const email = localStorage.getItem("user.email");
    setToken(authToken);
    setUserEmail(email);
      if(authToken) {
       dispatch( setIsAuth(true)) ;
      }
  }, [dispatch]);
  

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleOpenModalUser = () => {
    if (!isOpened) {
      dispatch(openModalUser());
    } else {
      dispatch(closeModalUser());
    }
  };
  const { isAuth } = useSelector((state: RootState) => state.auth);
  
      
      

  return (
    <div className="flex justify-between align-baseline mt-12.5">
      <div>
        <Link href="/fitness/main">
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
      {isAuth? (
        <div>
          <div
            className="flex gap-5 items-center cursor-pointer relative"
            onClick={handleOpenModalUser}
          >
            <Image width={42} height={42} src="/noAva2.svg" alt={"avatar"} />
            {userEmail}
            <div className="flex gap-3">
              <Image width={8} height={8} src="/galka.svg" alt={"open"} />
            </div>

            <UserModal />
          </div>
        </div>
      ) : (
        <div className="w-26 h-13">
          <ButtonGreen text={"Войти"} onClick={handleOpenModal} />
        </div>
      )}
    </div>
  );
}
