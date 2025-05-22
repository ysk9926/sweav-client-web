import { IExerciseItem } from "@/types/write";
import { create } from "zustand";

type SelectedWeightDataStore = {
  selectedWeightData: IExerciseItem[];
  setSelectedWeightData: (selectedItemList: IExerciseItem[]) => void;
  reorderSelectedWeightData: (startIndex: number, endIndex: number) => void;
  resetData: () => void;
};

export const useSelectedWeightDataStore = create<SelectedWeightDataStore>((set) => ({
  selectedWeightData: [],
  setSelectedWeightData: (selectedData) => set({ selectedWeightData: selectedData }),
  resetData: () => set({ selectedWeightData: [] }),
  reorderSelectedWeightData: (startIndex, endIndex) =>
    set((state) => {
      const newData = [...state.selectedWeightData];
      const [removed] = newData.splice(startIndex, 1);
      newData.splice(endIndex, 0, removed);
      return { selectedWeightData: newData };
    }),
}));
