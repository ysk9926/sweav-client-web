import { WriteDate } from "@/types/write";
import { create } from "zustand";

type SelectedDateStore = {
  selectedDate: WriteDate;
  setSelectedDate: (date: WriteDate) => void;
  resetDate: () => void;
};

export const useSelectedDateStore = create<SelectedDateStore>((set) => ({
  selectedDate: { month: 0, day: 0 },
  setSelectedDate: (date) => set({ selectedDate: date }),
  resetDate: () => set({ selectedDate: { month: 0, day: 0 } }),
}));
