import { ExerciseSearchData } from "@/types/write";
import { create } from "zustand";

type ExerciseSearchDataStore = {
  exerciseSearchData: ExerciseSearchData;
  setExerciseSearchData: (searchData: ExerciseSearchData) => void;
  resetData: () => void;
};

export const useExerciseSearchDataStore = create<ExerciseSearchDataStore>((set) => ({
  exerciseSearchData: { searchData: "" },
  setExerciseSearchData: (searchData) => set({ exerciseSearchData: searchData }),
  resetData: () => set({ exerciseSearchData: { searchData: "" } }),
}));
