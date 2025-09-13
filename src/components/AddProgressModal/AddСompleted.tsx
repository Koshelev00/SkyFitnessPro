import { closeModalCompleted } from "@/Store/features/Worcout/workoutSlice";
import { useAppDispatch } from "@/Store/hooks";
import Image from "next/image";

export default function AddCompleted() {
  const dispatch = useAppDispatch();
  const onClose = () => {
    dispatch(closeModalCompleted());
  };
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center  z-[9999]"
      onClick={onClose}
    >
      <div className="bg-white p-10 w-[343px] h-[252px] md:w-[400px] md:h-[525px] shadow-lg flex flex-col items-center justify-center rounded-[30px]">
        <div className="text-center">
          <h2 className="text-[32px] md:text-[40px] pb-8 font-semibold leading-[110%] ">
            {"Ваш прогресс засчитан"}
          </h2>
        </div>
        <div>
          <Image
            width={68}
            height={68}
            alt={"Done"}
            src={"/image/completed.png"}
            className="h-[68px] w-[68px]"
          />
        </div>
      </div>
    </div>
  );
}
