import Image from "next/image";
import CardProfile from "../Card/CardProfile";
import { clearUser, setIsAuth } from "@/Store/features/Autch/autchSlice";
import { useDispatch, useSelector } from "react-redux";
import {useRouter } from "next/navigation";
import { RootState, AppDispatch } from "@/Store/store";
import ButtonWihte from "../Button/ButtonWhite";
import { useEffect} from "react";
import { getUserProfileThunk } from "@/Store/features/Autch/thunk";
import { fetchCourseProgressThunk } from "@/Store/features/Progress/thunk";
import { fetchCoursesThunk } from "@/Store/features/Courses/thunk"; // Добавьте этот импорт


export default function Profile() {
  const { isAuth, user } = useSelector((state: RootState) => state.auth);
  const { courses, status: coursesStatus } = useSelector(
    (state: RootState) => state.courses
  ); // Добавьте статус курсов
  const { courseProgress, status: progressStatus } = useSelector(
    (state: RootState) => state.progress
  );
  // const { workouts, status: workoutStatus } = useSelector(
  //   (state: RootState) => state.workouts
  // );

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  // const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  // Находим курсы пользователя
  const userCourses = courses.filter((course) =>
    user?.selectedCourses?.includes(course._id)
  );


  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // Загружаем курсы
      dispatch(fetchCoursesThunk());

      // Загружаем профиль пользователя
      dispatch(getUserProfileThunk(token))
       
        .then((userData) => {
          console.log(userData.meta.requestId)
          // Для каждого курса пользователя загружаем прогресс
          // userData.selectedCourses?.forEach((courseId: string) => {
          //   dispatch(fetchCourseProgressThunk(courseId));
          // });
        })
        .catch((error) => {
          console.error("Failed to load user profile:", error);
        })
       
    }
  }, [dispatch]);

  const handleLogout = () => {
    if (isAuth) {
      dispatch(clearUser());
      dispatch(setIsAuth(false));
      router.push("/");
    }
  };

  return (
    <div className="bg-[#fafafa] pt-15 pb-70">
      <h2 className="text-[#00001] text-[40px] font-semibold">Профиль</h2>

      <div className="bg-[#FFFFFF] shadow-2xl w-full rounded-[30px] p-7.5 mt-10">
        <div className="flex gap-[33px]">
          <div>
            <Image
              width={197}
              height={197}
              className=""
              src="/noAva.svg"
              alt={"Avatar"}
            />
          </div>
          <div>
            <h3 className="text-[32px] font-medium leading-9.5">
              {user?.email}
            </h3>
            <div className="mt-7.5 mb-10">
              <p className="text-[18px] font-normal leading-9.5">
                Логин: {user?.email}
              </p>
            </div>
            <div className="w-[192px] h-[52px]">
              <ButtonWihte text={"Выйти"} onClick={handleLogout} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-15 mb-10">
        <h2 className="text-[#00001] text-[40px] font-semibold">Мои курсы</h2>
      </div>

      {(progressStatus === "loading" || coursesStatus === "loading") && (
        <div className="text-center py-10">
          <p className="text-gray-500 text-lg">Загрузка данных...</p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-10">
        {userCourses.length > 0 ? (
          userCourses.map((course) => {
            // Находим прогресс для данного курса
            const progressForCourse = Array.isArray(courseProgress)
              ? courseProgress.find(
                  (progress: any) => progress.courseId === course._id
                )
              : courseProgress?.courseId === course._id
              ? courseProgress
              : null;

            const percent = progressForCourse ? progressForCourse.percent : 0;

            return (
              <div key={course._id}>
                
                <CardProfile course={course} progress={percent} />
              </div>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-10">
            <p className="text-gray-500 text-lg">
              У вас пока нет выбранных курсов
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
