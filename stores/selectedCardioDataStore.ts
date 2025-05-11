import { IExerciseItem, unSelectedExercise } from "@/types/write";
import { create } from "zustand";

type SelectedCardioDataStore = {
  selectedCardioData: IExerciseItem;
  setSelectedCardioData: (selectedItem: IExerciseItem) => void;
  resetData: () => void;
};

export const useSelectedCardioDataStore = create<SelectedCardioDataStore>((set) => ({
  selectedCardioData: unSelectedExercise,
  setSelectedCardioData: (selectedData) => set({ selectedCardioData: selectedData }),
  resetData: () => set({ selectedCardioData: unSelectedExercise }),
}));
