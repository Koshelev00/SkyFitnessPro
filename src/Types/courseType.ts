// Тип тренировки (workout)
export interface WorkoutType {
  _id: string;
  name: string;
  video: string;
  exercises: {
    _id: string;
    name: string;
    quantity: number;
  }[];
}

// Тип курса (course)
export interface CourseType {
  _id: string;
  nameRU: string;
  nameEN: string;
  description: string;
  directions: string[];
  fitting: string[];
  token: string;
  difficulty?: string;
  durationInDays?: number;
  dailyDurationInMinutes?: {
    from: number;
    to: number;
  };
  workouts: string[] | WorkoutType[]; 
  
}
