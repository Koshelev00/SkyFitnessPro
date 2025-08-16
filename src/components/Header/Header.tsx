import Link from "next/link";
import Image from "next/image";
import Button from "../Button/Button";
export default function Header() {
  return (
    <div className="w-full flex gap-210 justify-center align-baseline mt-12.5 ">
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
          
<Button text={"Войти"}
className="w-26 h-13"/>
    </div>
  );
}
