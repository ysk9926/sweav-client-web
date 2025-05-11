"use client";

import ColorDeleteBtn from "@/shared/icons/ColorDeleteBtn";
import DeleteBtn from "@/shared/icons/DeleteBtn";
import { IExerciseItem } from "@/types/write";

interface Props {
  exercises: IExerciseItem[];
  selecteedExercise: (exercise: IExerciseItem) => void;
}

export default function SelectedWeightChips({
  exercises,
  selecteedExercise,
}: Props) {
  return (
    <div className="w-full flex px-4">
      <div className="w-full h-fit overflow-x-auto overflow-y-hidden scrollbar-hide mb-2">
        <div className="flex space-x-2 px-2">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="flex-shrink-0 flex items-center bg-fill-brand-default text-text-brand-default rounded-full px-3 py-1 space-x-2 max-w-[90%]"
              style={{ whiteSpace: "nowrap" }}
            >
              <span className="text-button-s font-medium truncate">
                {exercise.name}
              </span>
              <div onClick={() => selecteedExercise(exercise)}>
                <ColorDeleteBtn />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
