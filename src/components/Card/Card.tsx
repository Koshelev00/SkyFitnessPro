import Link from "next/link";
import Image from "next/image";

export default function Card() {
return(
    <div className="relative w-[360px] h-[501px]">
        <Link href="#">
          <Image
            width={32}
            height={32}
            className="absolute right-5.5 top-5.5 "
            src="/Circle.svg"
            alt={"logo"}
          />
         
        </Link>
        <div>
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
        <div>
<h2>Йога</h2>
<div></div>
<div></div>
<div></div>
        </div>
    </div>
)
}