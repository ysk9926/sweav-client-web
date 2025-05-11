import { IExerciseItem } from "@/types/write";
import { create } from "zustand";

type SelectedWeightDataStore = {
  selectedWeightData: IExerciseItem[];
  setSelectedWeightData: (selectedItemList: IExerciseItem[]) => void;
  resetData: () => void;
};

export const useSelectedWeightDataStore = create<SelectedWeightDataStore>((set) => ({
  selectedWeightData: [],
  setSelectedWeightData: (selectedData) => set({ selectedWeightData: selectedData }),
  resetData: () => set({ selectedWeightData: [] }),
}));
