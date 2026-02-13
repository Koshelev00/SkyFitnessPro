export type WorkoutExerciseType = {
  _id: string;
  name: string;
  quantity: number;
};

export type Workout = {
  _id: string;
  name: string;
  video: string;
  exercises: WorkoutExerciseType[];
};

export type WorkoutShort = {
  _id: string;
  name: string;
  video: string;
  exercises: unknown[];
};

export type formattedNameType = {
  title: string;
  subtitle: string;
};
