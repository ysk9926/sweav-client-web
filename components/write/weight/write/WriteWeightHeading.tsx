"use client";

import { useSelectedWeightDataStore } from "@/stores/selectedWeightDataStore";
import { IExercisepart } from "@/types/write";
import { useMemo } from "react";

export default function WriteWeightHeading() {
  const { selectedWeightData } = useSelectedWeightDataStore();

  const parts: IExercisepart[] = useMemo<IExercisepart[]>(() => {
    const seen = new Set<string>();
    return selectedWeightData
      .flatMap((item) => item.parts)
      .filter((part) => {
        if (seen.has(part.code)) return false;
        seen.add(part.code);
        return true;
      });
  }, [selectedWeightData]);

  const names: string[] = useMemo<string[]>(() => selectedWeightData.map((item) => item.name), [selectedWeightData]);
  return (
    <div>
      <div className="text-button-s font-medium text-text-neutral-tertiary mb-6">수행한 운동</div>
      <div className="text-text-neutral-default text-heading-xl font-bold mb-3">
        <div className="flex space-x-2">
          {parts.map((part, idx) => (
            <div key={idx}>
              {part.name}
              {parts.length !== idx + 1 && `,`}
            </div>
          ))}
        </div>
        <div>
          <span className="font-outfit">{names.length}</span>
          <span>가지 운동</span>
        </div>
      </div>
      <div className="text-text-neutral-secondary text-body-m space-y-2">
        {names.map((name) => (
          <div>{name}</div>
        ))}
      </div>
    </div>
  );
}
