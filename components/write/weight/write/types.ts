export interface ExerciseItemWithSetInfo {
  itemId: string;
  exerciseName: string;
  setList: SetInfo[];
}

export interface SetInfo {
  setId: string;
  weight: number;
  reps: number;
}
