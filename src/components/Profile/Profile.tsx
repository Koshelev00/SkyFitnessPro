"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { RootState, AppDispatch } from "@/Store/store";
import CardProfile from "../Card/CardProfile";
import { clearUser, setIsAuth } from "@/Store/features/Autch/autchSlice";
import { getUserProfileThunk } from "@/Store/features/Autch/thunk";
import { fetchCoursesThunk } from "@/Store/features/Courses/thunk";
import { fetchCourseProgressThunk } from "@/Store/features/Progress/thunk";
import ButtonWihte from "../Button/ButtonWhite";

interface CourseWorkoutsType {
  _id: string;
  name: string;
}
interface WorkoutProgress {
  workoutId: string;
  workoutCompleted: boolean;
  progressData: number[];
  _id: string;
}
interface CourseProgressResponse {
  courseId: string;
  courseCompleted: boolean;
  workoutsProgress: WorkoutProgress[];
  _id: string;
}

export default function Profile() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { courses, status: coursesStatus } = useSelector(
    (state: RootState) => state.courses,
  );
  const { courseProgress, status: progressStatus } = useSelector(
    (state: RootState) => state.progress,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    icon?: string;
    visible: boolean;
  } | null>(null);
  const addToast = (message: string, icon?: string) => {
    setToast({ message, icon, visible: true });
    setTimeout(() => {
      setToast((prev) => (prev ? { ...prev, visible: false } : null));
    }, 2000);
  };

  const userCourses = courses.filter((course) =>
    user?.selectedCourses?.includes(course._id),
  );

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        router.push("/");
        return;
      }

      try {
        setIsLoading(true);
        setIsAuthorized(true);

        await dispatch(fetchCoursesThunk()).unwrap();

        const userProfileAction = await dispatch(getUserProfileThunk(token));

        if (getUserProfileThunk.fulfilled.match(userProfileAction)) {
          const userData = userProfileAction.payload;
          const selectedCourses =
            userData.user?.selectedCourses || userData.selectedCourses || [];

          if (selectedCourses.length > 0) {
            await Promise.allSettled(
              selectedCourses.map((courseId: string) =>
                dispatch(fetchCourseProgressThunk(courseId)).unwrap(),
              ),
            );
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        if ((error as any)?.status === 401) handleLogout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthAndLoadData();
  }, [dispatch, router]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user.email");
    dispatch(clearUser());
    dispatch(setIsAuth(false));
    router.push("/");
  };

  const getCourseProgress = (courseId: string): number => {
    const data: CourseProgressResponse | undefined = courseProgress?.[courseId];
    if (!data) return 0;
    if (data.courseCompleted) return 100;

    const course = courses.find((c) => c._id === courseId);
    if (!course || !Array.isArray(course.workouts)) return 0;

    const allWorkouts: (string | CourseWorkoutsType)[] = course.workouts;
    const completed = allWorkouts.filter((workout) => {
      const workoutId = typeof workout === "string" ? workout : workout._id;
      const workoutProgress = data.workoutsProgress?.find(
        (w) => w.workoutId === workoutId,
      );
      return workoutProgress?.workoutCompleted === true;
    }).length;

    return allWorkouts.length > 0
      ? Math.round((completed / allWorkouts.length) * 100)
      : 0;
  };

  const getWorkoutStats = (courseId: string): string => {
    const data: CourseProgressResponse | undefined = courseProgress?.[courseId];
    if (!data) return "";
    const course = courses.find((c) => c._id === courseId);
    if (!course || !Array.isArray(course.workouts)) return "";
    const allWorkouts: (string | CourseWorkoutsType)[] = course.workouts;
    const completed = allWorkouts.filter((workout) => {
      const workoutId = typeof workout === "string" ? workout : workout._id;
      const workoutProgress = data.workoutsProgress?.find(
        (w) => w.workoutId === workoutId,
      );
      return workoutProgress?.workoutCompleted === true;
    }).length;

    return allWorkouts.length > 0
      ? `Завершено: ${completed} / ${allWorkouts.length} тренировок`
      : "";
  };

  if (!isAuthorized && !isLoading) {
    return (
      <div className="bg-[#fafafa] pt-10 md:pt-15 md:pb-70 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Перенаправление на главную...</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-[#fafafa] pt-10 md:pt-15 md:pb-70 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Загрузка профиля...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] pt-10 md:pt-15 md:pb-70" id="section2">
      <h2 className="text-black text-[24px] md:text-[40px] font-semibold">
        Профиль
      </h2>

      <div className="bg-white shadow-2xl rounded-[30px] p-7.5 mt-10">
        <div className="flex gap-[33px] flex-col lg:flex-row">
          <div className="flex justify-center">
            <Image width={197} height={197} src="/noAva.svg" alt="Avatar" />
          </div>
          <div>
            <h3 className="text-[24px] md:text-[32px] font-medium leading-9.5">
              {user?.email}
            </h3>
            <div className="mt-7.5 mb-10">
              <p className="text-[16px] md:text-[18px] font-normal leading-9.5">
                Логин: {user?.email}
              </p>
            </div>
            <div className="w-[283px] md:w-[192px] h-[52px] items-center">
              <ButtonWihte text="Выйти" onClick={handleLogout} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 md:mt-15 mb-10">
        <h2 className="text-black text-[24px] md:text-[40px] font-semibold">
          Мои курсы
        </h2>
      </div>

      {(progressStatus === "loading" || coursesStatus === "loading") && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">Загрузка данных...</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        {userCourses.length > 0 ? (
          userCourses.map((course) => {
            const progress = getCourseProgress(course._id);
            const workoutStats = getWorkoutStats(course._id);

            return (
              <CardProfile
                key={course._id}
                course={course}
                progress={progress}
                workoutStats={workoutStats}
                addToast={addToast}
              />
            );
          })
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500 text-lg">
              У вас пока нет выбранных курсов
            </p>
          </div>
        )}

        <div className="justify-end mt-6 mb-10 flex md:hidden">
          <div className="w-32 h-13">
            <Link
              href="#section2"
              className="px-5 py-2 h-[52px] w-full rounded-full text-black font-normal duration-200 bg-[#BCEC30] hover:bg-[#C6FF00] cursor-pointer active:bg-black active:text-white flex items-center justify-center"
            >
              Наверх ↑
            </Link>
          </div>
        </div>
      </div>
      {toast && (
        <div
          className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 bg-[#BCEC30] text-[#000000] w-50 px-4 py-4 rounded-xl text-2xl flex flex-row justify-center gap-3 shadow-lg  transition-all duration-500
            ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}`}
        >
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}
