import { useCallback, useEffect, useRef } from "react";
import ButtonGreen from "../Button/ButtonGreen";
import { useAppDispatch, useAppSelector } from "@/Store/hooks";
import { fetchWorkoutsThunk } from "@/Store/features/Worcout/thunk";
import { RootState } from "@/Store/store";
import { closeModalWorkout } from "@/Store/features/Worcout/workoutSlice";


type WorkoutProps = {
  courseId: string;
  onClose: () => void;
};

export default function ModalWorkout({ courseId, onClose }: WorkoutProps) {
  const { isOpen, workouts } = useAppSelector((state: RootState) => state.workouts);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  
  // Фильтруем тренировки по courseId
  // const currentWorkouts = workouts.filter(workout => workout.courseId === courseId);
  
  const handleCloseModal = useCallback(() => {
    dispatch(closeModalWorkout());
    
  }, [dispatch]);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      handleCloseModal();
    }
  }, [handleCloseModal]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
    dispatch(fetchWorkoutsThunk({courseId, token}));
    }
    }, [dispatch, courseId]);
useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, handleClickOutside]);

  // Обработка клавиши Escape
  useEffect(() => {
    if (isOpen) {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleCloseModal();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, handleCloseModal]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40">
        <div
          ref={modalRef}
          className="w-[460px] p-10 bg-[#FFFFFF] rounded-[30px] relative"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-22 flex items-center text-center">
            <h2 className="text-[#000000] text-[32px] font-normal">
              Выберите тренировку
            </h2>
          </div>
          <div className="w-[380px] h-[380px] mb-[34px]">
            <div className="w-[354px] border-b-2 border-solid border-[#C4C4C4] mr-5">
               {workouts.map((w) => <div key={w._id}> {w.name} </div>)}
            </div>
          </div>
          <div>
            <ButtonGreen text="Начать" />
          </div>
        </div>
      </div>
    </>
  );
}
