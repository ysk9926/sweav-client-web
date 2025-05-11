"use client";

import { ExercisePart, IExercisepart, WeightPartMap } from "@/types/write";
import { SetStateAction, useEffect } from "react";

interface Props {
  selectedPart: string[];
  setSelectedPart: (value: SetStateAction<ExercisePart[]>) => void;
}
export default function SelectWeightPart({
  selectedPart,
  setSelectedPart,
}: Props) {
  const keys = Object.keys(WeightPartMap);

  const toggleKey = (key: ExercisePart) => {
    setSelectedPart((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden py-2 scrollbar-hide">
      <div className="flex space-x-4 px-4">
        {keys.map((key) => {
          const value = WeightPartMap[key];
          const isSel = selectedPart.includes(value as ExercisePart);
          return (
            <div
              key={key}
              onClick={() => toggleKey(value as ExercisePart)}
              className={`flex rounded-xl text-button-m font-semibold
            ${
              isSel
                ? "border-2 border-button-line-brand-default bg-button-fill-brand-secondary text-button-text-brand-default"
                : "bg-button-fill-neutral-secondary border-2 border-button-fill-neutral-secondary"
            }
            `}
            >
              <span className=" w-16 h-10 flex justify-center items-center">
                {key}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
