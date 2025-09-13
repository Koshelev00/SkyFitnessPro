import Image from "next/image";
import { CourseType } from "@/Types/courseType";
import { useAppDispatch } from "@/Store/hooks";
import { deleteUserCourseThunk } from "@/Store/features/Courses/thunk";
import { resetCourseProgressThunk } from "@/Store/features/Progress/thunk";
import { useRouter } from "next/navigation";
import ProgressBar from "../ProgressBar/ProgressBar";
import ButtonGreen from "../Button/ButtonGreen";

interface CardProfileProps {
  course: CourseType;
  progress: number;
  workoutStats?: string;
  addToast: (message: string, icon?: string) => void;
}

export default function CardProfile({
  course,
  progress,
  workoutStats,
  addToast,
}: CardProfileProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const courseId = course._id;

  const handleDeleteCourse = () => {
    dispatch(deleteUserCourseThunk(course._id));
    dispatch(resetCourseProgressThunk(course._id));
    addToast("Курс удален");
  };

  const handleWorkoutButton = () => {
    router.push(`/courseWorkout/${courseId}`);
  };

  const getButtonText = () => {
    if (progress === 0) return "Начать тренировки";
    if (progress > 0 && progress < 100) return "Продолжить";
    if (progress === 100) return "Начать заново";
    return "Начать тренировки";
  };

  return (
    <div className="relative w-[343px] md:w-[360px] bg-[#FFFFFF] rounded-[30px] shadow-2xl">
      <Image
        width={32}
        height={32}
        className="absolute right-5.5 top-5.5 cursor-pointer"
        src="/delete.svg"
        alt="Удалить курс"
        onClick={handleDeleteCourse}
      />

      <div className="mb-8">
        <Image
          width={360}
          height={180}
          className="object-cover rounded-t-[30px]"
          src={`/image/${course.nameEN}.png`}
          alt={course.nameRU}
          onError={(e) => {
            e.currentTarget.src = "/image/default-course.png";
          }}
        />
      </div>

      <div className="mx-7.5 pb-10 md:pb-[15px]">
        <h2 className="text-[#001] text-[24px] md:text-[32px] font-medium leading-9.5">
          {course.nameRU}
        </h2>

        <div className="flex gap-1.5 mt-5">
          <div className="flex bg-[#F7F7F7] w-[103px] h-[38px] rounded-[50px] p-2.5 gap-1.5">
            <Image width={18} height={18} src="/Calendar.svg" alt="calendar" />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px]">
              {course.durationInDays ?? 0} дней
            </span>
          </div>
          <div className="flex bg-[#F7F7F7] w-[163px] h-[38px] rounded-[50px] p-2.5 gap-1.5">
            <Image width={18} height={18} src="/Time.svg" alt="time" />
            <span className="text-[#202020] text-[16px] font-normal leading-[19px]">
              {course.dailyDurationInMinutes?.from ?? 0}-
              {course.dailyDurationInMinutes?.to ?? 0} мин/день
            </span>
          </div>
        </div>

        <div className="flex bg-[#F7F7F7] w-[129px] h-[38px] rounded-[50px] p-2.5 gap-1.5 mt-1.5">
          <Image width={18} height={18} src="/signal-fill.svg" alt="signal" />
          <span className="text-[#202020] text-[16px] font-normal leading-[19px]">
            {course.difficulty ?? "—"}
          </span>
        </div>

        <div className="text-[18px] mt-5 mb-10">
          <p className="text-[18px]">Прогресс {progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2.5">
            <ProgressBar progress={progress} />
          </div>
        </div>

        <ButtonGreen text={getButtonText()} onClick={handleWorkoutButton} />
      </div>
    </div>
  );
}
