import Link from "next/link";
import Image from "next/image";
import {CourseType} from "@/Types/courseType";
import { useAppDispatch } from "@/Store/hooks"; 
import { addUserCourseThunk } from "@/Store/features/Courses/thunk"; 

export default function Card({ course }: { course: CourseType }) {
   const dispatch = useAppDispatch();
 
  const handleAddCourse = () => {
    
    dispatch(addUserCourseThunk(course._id));
    
  };


  return (
    <div className="relative w-[360px] h-[501px] bg-[#FFFFFF] rounded-[30px] shadow-2xl">
      
        <Image
          width={32}
          height={32}
          className="absolute right-5.5 top-5.5 cursor-pointer "
          src="/Circle.svg"
          alt={"Добавить курс"}
          onClick={handleAddCourse}
        />
      
      <div className="mb-8">
        <Link href={`/fitness/course/${course._id}`}>
          <Image
            width={360}
            height={35}
            className=""
            src={`/image/${course.nameEN}.png`}
            alt={course.nameRU}
          />
        </Link>
      </div>
      <div className="mx-7.5">
        <h2 className=" text-[#001] text-[32px] font-medium leading-9.5 ">
          {course.nameRU}
        </h2>
        <div className="flex gap-1.5 mt-5">
          <div className="flex  bg-[#F7F7F7] w-[103px] h-[38px] rounded-[50px] p-2.5 gap-1.5">
            <Image width={18} height={18} src="/Calendar.svg" alt={"calendar"} />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px] ">
              {course.durationInDays ?? 0} дней
            </span>
          </div>
          <div className="flex  bg-[#F7F7F7] w-[163px] h-[38px] rounded-[50px] p-2.5 gap-1.5">
            <Image width={18} height={18} src="/Time.svg" alt={"time"} />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px] ">
              {(course.dailyDurationInMinutes?.from ?? 0)}-
              {(course.dailyDurationInMinutes?.to ?? 0)} мин/день
            </span>
          </div>
        </div>
        <div>
          <div className="flex  bg-[#F7F7F7] w-[129px] h-[38px] rounded-[50px] p-2.5 gap-1.5 mt-1.5">
            <Image width={18} height={18} src="/signal-fill.svg" alt={"signal"} />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px] ">
              {course.difficulty ?? "—"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
