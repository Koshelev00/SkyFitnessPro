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
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { isOpened, isAuth } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    const email = localStorage.getItem("user.email");
    
    setUserEmail(email);
    
    // Устанавливаем isAuth только если токен есть и статус еще не установлен
    if (authToken && !isAuth) {
      dispatch(setIsAuth(true));
    }
    
    // Сбрасываем isAuth если токена нет но статус установлен
    if (!authToken && isAuth) {
      dispatch(setIsAuth(false));
    }
  }, [dispatch, isAuth]); // Добавляем isAuth в зависимости

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleToggleModalUser = () => {
    dispatch(isOpened ? closeModalUser() : openModalUser());
  };

  return (
    <div className="flex justify-between align-baseline mt-12.5">
      <div>
        <Link href="/">
          <Image
            width={220}
            height={35}
            src="/logo.svg"
            alt="logo"
            priority // Добавляем приоритетную загрузку для логотипа
          />
          <div className="hidden text-gray-500 opacity-[0.5] text-lg font-normal leading-[21px] w-[327px] md:block">
            Онлайн-тренировки для занятий дома
          </div>
        </Link>
      </div>
      
      {isAuth ? (
        <div className="relative">
          <div
            className="flex gap-[10px] items-center cursor-pointer md:gap-4"
            onClick={handleToggleModalUser}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleToggleModalUser()}
          >
            <Image 
              width={42} 
              height={42} 
              src="/noAva2.svg" 
              alt="avatar" 
              className="md:w-9 md:h-9" 
            />
            <div className="hidden md:block">
              {userEmail}
            </div>
            <div className="flex gap-3">
              <Image width={8} height={8} src="/galka.svg" alt="toggle menu" />
            </div>
          </div>
          
          {isOpened && <UserModal />}
        </div>
      ) : (
        <div className="w-26 h-13">
          <ButtonGreen text="Войти" onClick={handleOpenModal} />
        </div>
      )}
    </div>
  );
}