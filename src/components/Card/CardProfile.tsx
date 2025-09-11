import Image from "next/image";
import { CourseType } from "@/Types/courseType";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { deleteUserCourseThunk } from "@/Store/features/Courses/thunk";
import { fetchCourseProgressThunk, resetCourseProgressThunk } from "@/Store/features/Progress/thunk";
import { useRouter } from "next/navigation";
import ProgressBar from "../ProgressBar/ProgressBar";
import { useEffect, useState } from "react";
import ButtonGreen from "../Button/ButtonGreen";

interface CardProfileProps {
  course: CourseType;
}

interface WorkoutProgress {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
}

interface CourseProgressResponse {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: WorkoutProgress[];
  
}

export default function Card({ course }: CardProfileProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const courseId = course._id;
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Получаем прогресс курса из Redux store
  const courseProgress = useAppSelector((state) => 
    state.progress.courseProgress?.[courseId] as CourseProgressResponse | undefined
  );

  // ✅ Получаем статус загрузки
  const progressStatus = useAppSelector((state) => state.progress.status);
  
  // ✅ Загружаем прогресс курса при монтировании компонента
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && courseId) {
      setIsLoading(true);
      dispatch(fetchCourseProgressThunk(courseId))
        .unwrap()
        .finally(() => setIsLoading(false));
    }
  }, [dispatch, courseId]);

  const handleDeleteCourse = () => {
    dispatch(deleteUserCourseThunk(course._id));
    dispatch(resetCourseProgressThunk(course._id))
  };

  const workoutButton = () => {
    router.push(`/courseWorkout/${courseId}`);
  };

  // ✅ Функция для расчета общего прогресса курса
  const calculateOverallProgress = () => {
    console.log('Course progress data:', courseProgress); // Добавим лог для отладки
    
    if (!courseProgress || !courseProgress.workoutsProgress) {
      console.log('No progress data available');
      return 0;
    }
    
    console.log('Workouts progress:', courseProgress.workoutsProgress);
    
    // Если есть готовое значение courseCompleted
    if (courseProgress.courseCompleted) {
      console.log('Course is completed: 100%');
      return 100;
    }
    
    // Считаем процент завершенных тренировок
    const completedWorkouts = courseProgress.workoutsProgress.filter(
      (workout: WorkoutProgress) => workout.workoutCompleted === true
    ).length;
    
    const totalWorkouts = courseProgress.workoutsProgress.length;
    
    console.log(`Completed: ${completedWorkouts}, Total: ${totalWorkouts}`);
    
    if (totalWorkouts === 0) {
      console.log('No workouts available: 0%');
      return 0;
    }
    
    const progress = Math.round((completedWorkouts / totalWorkouts) * 100);
    console.log(`Calculated progress: ${progress}%`);
    
    return progress;
  };

  const progress = calculateOverallProgress();

  // Функция для определения текста кнопки в зависимости от прогресса
  const getButtonText = () => {
    if (progress === 0) {
      return "Начать тренировки";
    } else if (progress > 0 && progress < 100) {
      return "Продолжить";
    } else if (progress === 100) {
      return "Начать заново";
    }
    return "Начать тренировки";
  };

  if (isLoading) {
    return (
      <div className="relative w-[360px] bg-[#FFFFFF] rounded-[30px] shadow-2xl p-6" >
        <div className="animate-pulse">
          <div className="bg-gray-300 h-40 rounded-[30px] mb-4"></div>
          <div className="bg-gray-300 h-6 rounded mb-2"></div>
          <div className="bg-gray-300 h-4 rounded mb-4"></div>
          <div className="bg-gray-300 h-8 rounded"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="relative w-[343px] md:w-[360px] bg-[#FFFFFF] rounded-[30px] shadow-2xl">
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
          height={180}
          className="object-cover rounded-t-[30px]"
          src={`/image/${course.nameEN}.png`}
          alt={course.nameRU}
          onError={(e) => {
            // Fallback если изображение не найдено
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
        
        <div className="text-[18px] mt-5 mb-10">
          <p className="text-[18px]">Прогресс {progress}%</p>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2.5">
            <ProgressBar progress={progress}/>
          </div>
          {/* ✅ Дополнительная информация о прогрессе */}
          {courseProgress?.workoutsProgress && (
            <div className="text-sm text-gray-500 mt-2">
              Завершено: {courseProgress.workoutsProgress.filter(w => w.workoutCompleted).length} / {courseProgress.workoutsProgress.length} тренировок
            </div>
          )}
        </div>
        
        <div className="">
          <ButtonGreen text={getButtonText()} onClick={workoutButton}/>
        </div>
      </div>
    </div>
  );
}