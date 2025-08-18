import Image from "next/image";
import Button from "../Button/Button";

export default function Workout() {
  return (
    <div>
      <div className="mt-15">
        <h2 className="text-6xl font-medium leading-17.5 ">Йога</h2>
      </div>
      <div className="mt-10">
        <iframe
          src="https://www.youtube.com/embed/Ewm-Bfg5ncg"
          className="w-[1160px] h-[639px] rounded-[36px]"
        ></iframe>
      </div>
      <div className="mt-10 rounded-[30px] bg-[#FFFFFF] shadow-2xl p-10">
        <h2 className="text-[#001] text-[32px] font-normal ">
          Упражнения тренировки 2
        </h2>
        <div className="grid grid-cols-3 mt-5 gap-15">
          <div>
            <div className="text-4.5">
              <p className="">Наклоны вперед 0%</p>
              <Image
                width={320}
                height={6}
                className={"mt-2.5"}
                src="/progress.svg"
                alt={"progress"}
              />
            </div>
            <div className="text-4.5">
              <p className="">Наклоны вперед 0%</p>
              <Image
                width={320}
                height={6}
                className={"mt-2.5"}
                src="/progress.svg"
                alt={"progress"}
              />
            </div>
            <div className="text-4.5">
              <p className="">Наклоны вперед 0%</p>
              <Image
                width={320}
                height={6}
                className={"mt-2.5"}
                src="/progress.svg"
                alt={"progress"}
              />
            </div>
          </div>
          <div>
            <div className="text-4.5">
              <p className="">Наклоны вперед 0%</p>
              <Image
                width={320}
                height={6}
                className={"mt-2.5"}
                src="/progress.svg"
                alt={"progress"}
              />
            </div>
            <div className="text-4.5">
              <p className="">Наклоны вперед 0%</p>
              <Image
                width={320}
                height={6}
                className={"mt-2.5"}
                src="/progress.svg"
                alt={"progress"}
              />
            </div>
            <div className="text-4.5">
              <p className="">Наклоны вперед 0%</p>
              <Image
                width={320}
                height={6}
                className={"mt-2.5"}
                src="/progress.svg"
                alt={"progress"}
              />
            </div>
          </div>
          <div>
            <div className="text-4.5">
              <p className="">Наклоны вперед 0%</p>
              <Image
                width={320}
                height={6}
                className={"mt-2.5"}
                src="/progress.svg"
                alt={"progress"}
              />
            </div>
            <div className="text-4.5">
              <p className="">Наклоны вперед 0%</p>
              <Image
                width={320}
                height={6}
                className={"mt-2.5"}
                src="/progress.svg"
                alt={"progress"}
              />
            </div>
            <div className="text-4.5">
              <p className="">Наклоны вперед 0%</p>
              <Image
                width={320}
                height={6}
                className={"mt-2.5"}
                src="/progress.svg"
                alt={"progress"}
              />
            </div>
          </div>
        </div>
        <div>
          <div className="w-[270px] h-[20px] mt-10 mb-10">
            <Button text={"Заполнить свой прогресс"} className="" />
          </div>
        </div>
      </div>
    </div>
  );
}
