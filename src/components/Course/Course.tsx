'use client';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/Store/store";
import { 
  fetchCourseByIdThunk, 
  addUserCourseThunk, 
  deleteUserCourseThunk
} from "@/Store/features/Courses/thunk";
import { openModal } from "@/Store/features/Autch/autchSlice";
import Image from "next/image";
import ButtonGreen from "../Button/ButtonGreen";
import Autch from "../Autch/Autch";

type CourseProps = {
  courseId: string;
};

interface Toast {
  id: number;
  message: string;
  visible: boolean;
}

export default function Course({ courseId }: CourseProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { currentCourse, status } = useSelector((state: RootState) => state.courses);
  const { isAuth, user } = useSelector((state: RootState) => state.auth);

  const [isMdScreen, setIsMdScreen] = useState(false);
  const [courseAdded, setCourseAdded] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [toastId, setToastId] = useState(0);

  
  useEffect(() => {
    setCourseAdded(user?.selectedCourses?.includes(courseId) || false);
  }, [user, courseId]);

  
  useEffect(() => {
    const checkScreenSize = () => setIsMdScreen(window.innerWidth >= 768);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);


  useEffect(() => {
    if (courseId) dispatch(fetchCourseByIdThunk(courseId));
  }, [courseId, dispatch]);

 
  const addToast = (message: string) => {
    const id = toastId + 1;
    setToastId(id);
    setToasts(prev => [...prev, { id, message, visible: true }]);
    setTimeout(() => {
      setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t));
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 800);
    }, 2000);
  };

  const handleCourseToggle = () => {
    if (!isAuth) {
      dispatch(openModal());  
      return;
    }

    if (courseAdded) {
      dispatch(deleteUserCourseThunk(courseId));
      setCourseAdded(false);
      addToast("Курс удален");
    } else {
      dispatch(addUserCourseThunk(courseId));
      setCourseAdded(true);
      addToast("Курс добавлен");
    }
  };

  if (status === "loading") return <p>Загрузка...</p>;
  if (!currentCourse) return <p>Курс не найден</p>;

  const fittingItems = currentCourse.fitting || [];
  const directionItems = currentCourse.directions || [];
  const imageSkill = isMdScreen 
    ? `/image/skillCard/${currentCourse.nameEN}.jpg`
    : `/image/${currentCourse.nameEN}.png`;

  return (
    <div className="mb-12.5 overflow-hidden bg-[#FAFAFA]">
      <div className="overflow-hidden relative h-[2150px] md:h-auto">
     
        <div className="mt-15">
          <Image width={1160} height={310} src={imageSkill} alt="SkillCard" className="w-full object-cover" />
        </div>

      
        <div className="mt-15">
          <h3 className="text-[24px] font-semibold text-[#00001] md:text-[40px]">
            Подойдет для вас, если:
          </h3>
          <div className="flex flex-col gap-[17px] mt-10 lg:flex-row">
            {fittingItems.map((fit, index) => {
              const getWidthClass = () => {
                switch (index) {
                  case 0: return "w-full lg:w-[368px] md:w-[431px]";
                  case 1: return "w-full lg:w-[431px] md:w-[431px]";
                  case 2: return "w-full lg:w-[327px] md:w-[431px]";
                  default: return "w-full";
                }
              };
              return (
                <div
                  key={index}
                  className={`h-[141px] flex items-center pl-22 md:pl-48 lg:pl-20 bg-cover bg-center ${getWidthClass()} rounded-[28px]`}
                  style={{
                    backgroundImage: isMdScreen 
                      ? `url('/image/Frame${index + 1}.jpg')`
                      : `url('/image/FrameMobile${index + 1}.jpg')`,
                  }}
                >
                  <div className="mr-5">
                    <h3 className="text-[#FFFFFF] text-[16px] lg:text-[20px] font-normal leading-7">
                      {fit}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        <div className="mt-15 mb-[102px] px-4 md:px-0">
          <h3 className="text-[24px] md:text-[40px] font-semibold text-[#00001]">Направления</h3>
          <div className="w-full max-w-[1160px] bg-[#BCEC30] rounded-[28px] mt-10 p-[30px] grid grid-cols-1 md:grid-cols-3 gap-y-[34px]">
            {directionItems.map((direction, index) => (
              <div key={index} className="flex gap-2 items-center">
                <Image width={26} height={26} src="/Sparcle.svg" alt="Sparcle" />
                <p className="text-[18px] md:text-[24px] font-normal leading-7">{direction}</p>
              </div>
            ))}
          </div>
        </div>


        <div className="z-[10] absolute top-414 md:static flex flex-col md:flex-row shadow-2xl bg-[#FFFFFF] p-[30px] md:p-10 rounded-[30px] mx-4 md:mx-0 mt-10px">
          <div className="w-full md:w-[437px] md:pb-10">
            <h2 className="text-[32px] md:text-6xl font-medium leading-tight md:leading-17.5 text-[#001]">
              Начните путь к новому телу
            </h2>
            <ul className="list-disc text-[18px] list-inside text-xl md:text-2xl font-normal text-gray-800 space-y-1 opacity-60 mt-7 mb-7">
              <li>проработка всех групп мышц</li>
              <li>тренировка суставов</li>
              <li>улучшение циркуляции крови</li>
              <li>упражнения заряжают бодростью</li>
              <li>помогают противостоять стрессам</li>
            </ul>
            <div className="w-full md:w-[437px] h-[52px]">
              <ButtonGreen
                text={isAuth ? (courseAdded ? "Удалить курс" : "Добавить курс") : "Войдите, чтобы добавить курс"}
                onClick={handleCourseToggle}
              />
            </div>
          </div>
        </div>

       
        <div className="fixed top-5 left-1/2 -translate-x-1/2 flex flex-col gap-4 z-50">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className={`bg-[#BCEC30] text-[#000] w-[250px] px-4 py-3 rounded-xl shadow-lg text-center font-semibold transition-all duration-500
                ${toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
            >
              {toast.message}
            </div>
          ))}
        </div>


        <div className="absolute 
          xl:w-162 xl:h-162 xl:right-[29px] xl:top-[930px]
          lg:w-162 lg:h-162 lg:right-[29px] lg:top-[940px]
          md:w-162 md:h-162 md:right-[-295px] md:top-[1226px]
          w-103 h-103 right-[-57px] top-[1390px]">
          <Image src="/sportsmen.svg" alt="sportsmen" width={162} height={162} className="w-full h-auto" />
        </div>
      </div>
      <Autch />
    </div>
  );
}
