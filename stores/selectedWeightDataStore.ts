import { IExerciseItem } from "@/types/write";
import { create } from "zustand";

type SelectedWeightDataStore = {
  selectedWeightData: IExerciseItem[];
  setSelectedWeightData: (selectedItemList: IExerciseItem[]) => void;
  deleteSelectedWeightData: (exerciseName: string) => void;
  replaceSelectedWeightData: (
    exerciseName: string,
    newExercise: IExerciseItem
  ) => void;
  resetData: () => void;
};

export const useSelectedWeightDataStore = create<SelectedWeightDataStore>(
  (set) => ({
    selectedWeightData: [],
    setSelectedWeightData: (selectedData) =>
      set({ selectedWeightData: selectedData }),
    resetData: () => set({ selectedWeightData: [] }),
    deleteSelectedWeightData: (exerciseName) =>
      set((state) => ({
        selectedWeightData: state.selectedWeightData.filter(
          (item) => item.name !== exerciseName
        ),
      })),
    replaceSelectedWeightData: (exerciseName, newExercise) =>
      set((state) => ({
        selectedWeightData: state.selectedWeightData.map((item) =>
          item.name === exerciseName ? newExercise : item
        ),
      })),
  })
);
