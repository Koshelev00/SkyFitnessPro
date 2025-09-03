
import Image from "next/image";
import Button from "../Button/ButtonGreen";
import { CourseType } from "@/Types/courseType";
import { useAppDispatch } from "@/Store/hooks";
import { deleteUserCourseThunk } from "@/Store/features/Courses/thunk";

// import { openModalWorkout } from "@/Store/features/Worcout/workoutSlice";
import Link from "next/link";

interface CardProfileProps {
  course: CourseType;
  progress: number;
}

export default function Card({ course, progress }: CardProfileProps) {
  const dispatch = useAppDispatch();
  
  
  const handleDeleteCourse = () => {
    dispatch(deleteUserCourseThunk(course._id));
  };
  // const handleOpenModal = () => {
  //   dispatch(openModalWorkout());
  // };


  // Функция для определения текста кнопки в зависимости от прогресса
  const getButtonText = () => {
    if (progress === 0) {
      return "Начать тренировки";
    } else if (progress > 0 && progress < 100) {
      return "Продолжить";
    } else if (progress === 100) {
      return "Начать заново";
    }
    return "Начать тренировки"; // fallback
  };

  return (
    <div className="relative w-[360px] bg-[#FFFFFF] rounded-[30px] shadow-2xl">
      <Image
        width={32}
        height={32}
        className="absolute right-5.5 top-5.5 cursor-pointer"
        src="/delete.svg"
        alt={"Удалить курс"}
        onClick={handleDeleteCourse}
      />
      
      <div className="mb-8">
     
          <Image
            width={360}
            height={35}
            className=""
            src={`/image/${course.nameEN}.png`}
            alt={course.nameRU}
            // onClick={handleOpenModal}
          />
        
      </div>
      
      <div className="mx-7.5 pb-[15px]">
        <h2 className="text-[#001] text-[32px] font-medium leading-9.5">
          {course.nameRU}
        </h2>
        
        <div className="flex gap-1.5 mt-5">
          <div className="flex bg-[#F7F7F7] w-[103px] h-[38px] rounded-[50px] p-2.5 gap-1.5">
            <Image width={18} height={18} src="/Calendar.svg" alt={"calendar"} />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px]">
              {course.durationInDays ?? 0} дней
            </span>
          </div>
          <div className="flex bg-[#F7F7F7] w-[163px] h-[38px] rounded-[50px] p-2.5 gap-1.5">
            <Image width={18} height={18} src="/Time.svg" alt={"time"} />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px]">
              {(course.dailyDurationInMinutes?.from ?? 0)}-
              {(course.dailyDurationInMinutes?.to ?? 0)} мин/день
            </span>
          </div>
        </div>
        
        <div>
          <div className="flex bg-[#F7F7F7] w-[129px] h-[38px] rounded-[50px] p-2.5 gap-1.5 mt-1.5">
            <Image width={18} height={18} src="/signal-fill.svg" alt={"signal"} />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px]">
              {course.difficulty ?? "—"}
            </span>
          </div>
        </div>
        
        <div className="text-4.5 mt-5 mb-10">
          <p className="text-4.5">Прогресс {progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2.5">
            <div 
              className="bg-green-500 h-1.5 rounded-full" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        
        <div className="">
          <Link href={"/fitness/WorkoutModal"}>
          <Button text={getButtonText()} />
          </Link>
        </div>
      </div>
    </div>
  );
}