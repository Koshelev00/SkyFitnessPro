import Link from "next/link";
import Image from "next/image";
export default function Header() {
  return (
    <div className="w-full flex gap-210 justify-center align-baseline  ">
      <div className="">
        <Link href="#">
          <Image
            width={220}
            height={35}
            className={"logo__image"}
            src="/logo.svg"
            alt={"logo"}
          />
          <div className="text-gray-500 opacity-[0.5] text-lg font-normal leading-[21px]">
            Онлайн-тренировки для занятий дома
          </div>
        </Link>

       
      </div>
          
<button className="w-26 h-13 bg-[#BCEC30] justify-center gap-2 py-4 px-6.5 rounded-[46px]">Войти</button> 
    </div>
  );
}
