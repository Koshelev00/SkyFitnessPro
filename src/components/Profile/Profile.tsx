import Image from "next/image";

import CardProfile from "../Card/CardProfile";
import { clearUser, setIsAuth } from "@/Store/features/autchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/Store/store";
import ButtonWihte from "../Button/ButtonWhite";

export default function Profile() {
  const { isAuth } = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    if (isAuth) {
      dispatch(clearUser());
      dispatch(setIsAuth(false));
      router.push("/fitness/main");
    }
  };
  const email = localStorage.getItem("user.email");
  return (
    <div className=" bg-[#fafafa] pt-15  pb-70">
      <h2 className="text-[#00001] text-[40px] font-semibold ">Профиль</h2>
      <div className="bg-[#FFFFFF] shadow-2xl w-full rounded-[30px] p-7.5 mt-10 ">
        <div className="flex gap-[33px] ">
          <div>
            <Image
              width={197}
              height={197}
              className=" "
              src="/noAva.svg"
              alt={"Avatar"}
            />
          </div>
          <div>
            <h3 className="text-[32px] font-medium leading-9.5"></h3>
            <div className="mt-7.5 mb-10 ">
              <p className="text-[18px] font-normal leading-9.5 ">{email}</p>
            </div>
            <div className="w-[192px] h-[52px]">
              <ButtonWihte text={"Выйти"} onClick={handleLogout} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-15">
        <h2 className="text-[#00001] text-[40px] font-semibold ">Мои курсы</h2>
      </div>
      <div className="grid grid-cols-3 gap-10">
        <CardProfile />
        <CardProfile />
        <CardProfile />
      </div>
    </div>
  );
}
