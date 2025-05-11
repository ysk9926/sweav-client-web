import { AddWeightPartMap, ExercisePart } from "@/types/write";
import { SetStateAction } from "react";

interface Props {
  selectedPart: ExercisePart;
  setSelectedPart: (value: SetStateAction<ExercisePart>) => void;
}

export default function PartFilter({ selectedPart, setSelectedPart }: Props) {
  const partKey = Object.keys(AddWeightPartMap);

  const toggleKey = (key: ExercisePart) => {
    setSelectedPart(key);
  };

  return (
    <div className="w-full flex px-4">
      <span className="text-body-m text-text-neutral-tertiary w-8 flex justify-center items-center mr-4">
        <span>부위</span>
      </span>
      <div className="w-full overflow-x-auto overflow-y-hidden py-2 scrollbar-hide">
        <div className="flex space-x-4 px-4">
          {partKey.map((part) => {
            const value = AddWeightPartMap[part];
            const isSel = selectedPart.includes(value as ExercisePart);
            return (
              <div
                key={part}
                onClick={() => toggleKey(value as ExercisePart)}
                className={`flex rounded-xl text-button-m font-semibold
                    ${isSel ? " text-button-text-brand-default" : " text-text-neutral-secondary"}
                    `}
              >
                <span className=" w-8 h-10 flex justify-center items-center">{part}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
