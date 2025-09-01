"use client";

import ButtonGreen from "../Button/ButtonGreen";
import ButtonWhite from "../Button/ButtonWhite";
import { clearUser, setIsAuth } from "@/Store/features/Autch/autchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/Store/store";
import { getUserProfileThunk } from "@/Store/features/Autch/thunk";

export default function UserModal() {
  const { isOpened, isAuth, email } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    
      dispatch(clearUser());
      dispatch(setIsAuth(false));
      router.push("/fitness/main");
    
      
  };
  const handleProfileClick = () => {
    router.push("/fitness/profile");
    
  };

  if (!isOpened) return null;
  return (
    <div className="bg-[#FFFFFF] rounded-[30px] w-[266px] h-[258px] flex flex-col gap-[57px] p-[30px] absolute z-10 top-[55px] right-[0px]">
      <span className="text-[18px] text-[#999999] font-normal">
        {email ?? ""}
      </span>
      <div className="flex flex-col gap-[10px] w-[206px] h-[114px] ">
        <ButtonGreen text="Мой профиль" onClick={handleProfileClick} />
        <ButtonWhite text="Выйти" onClick={handleLogout} />
      </div>
    </div>
  );
}
