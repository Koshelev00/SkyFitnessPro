import Link from "next/link";
import Image from "next/image";
import Button from "../Button/ButtonGreen";

export default function Card() {
  return (
    <div className="relative w-[360px]  bg-[#FFFFFF] rounded-[30px] shadow-2xl">
      <Link href="#">
        <Image
          width={32}
          height={32}
          className="absolute right-5.5 top-5.5 "
          src="/Circle.svg"
          alt={"logo"}
        />
      </Link>
      <div className="mb-8">
        <Link href="#">
          <Image
            width={360}
            height={35}
            className=""
            src="/image/yoga.png"
            alt={"card"}
          />
        </Link>
      </div>
      <div className="mx-7.5">
        <h2 className=" text-[#001] text-[32px] font-medium leading-9.5 ">
          Йога
        </h2>
        <div className="flex gap-1.5 mt-5">
          <div className="flex  bg-[#F7F7F7] w-[103px] h-[38px] rounded-[50px] p-2.5 gap-1.5">
            <Image
              width={18}
              height={18}
              className=""
              src="/Calendar.svg"
              alt={"calendar"}
            />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px] ">
              25 дней
            </span>
          </div>
          <div className="flex  bg-[#F7F7F7] w-[163px] h-[38px] rounded-[50px] p-2.5 gap-1.5">
            <Image
              width={18}
              height={18}
              className=""
              src="/Time.svg"
              alt={"time"}
            />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px] ">
              20-50 мин/день
            </span>
          </div>
        </div>
        <div>
          <div className="flex  bg-[#F7F7F7] w-[129px] h-[38px] rounded-[50px] p-2.5 gap-1.5 mt-1.5">
            <Image
              width={18}
              height={18}
              className=""
              src="/signal-fill.svg"
              alt={"signal"}
            />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px] ">
              Сложность
            </span>
          </div>
        </div>
        <div className="text-4.5 mt-5 mb-10">
          <p className="">Наклоны вперед 0%</p>
          <Image
            width={320}
            height={6}
            className={"mt-2.5"}
            src="/progress.svg"
            alt={"progress"}
          />
        </div>
        <div className="mb-[15px]">
          <Button text={"Начать тренировки"} />
        </div>
      </div>
    </div>
  );
}
