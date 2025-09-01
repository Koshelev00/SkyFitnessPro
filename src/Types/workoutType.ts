export type WorkoutExercise = {
  _id: string;
  name: string;
  quantity: number;
};

export type Workout = {
  _id: string;
  name: string;
  video: string; 
  exercises: WorkoutExercise[];
};

export type WorkoutShort = {
  _id: string;
  name: string;
  video: string;
  exercises: unknown[];
};
