"use client";

import RecordNavigationBar from "../../navigationbar/RecordNavigationBar";
import { useSelectedWeightDataStore } from "@/stores/selectedWeightDataStore";
import WriteWeightForm from "./WriteWeightForm";

export default function WriteWeight() {
  const { selectedWeightData } = useSelectedWeightDataStore();

  // 중복되지 않는 운동 부위들을 추출
  const uniqueParts = Array.from(
    new Set(selectedWeightData.flatMap((exercise) => exercise.parts.map((part) => part.name)))
  ).join(", ");

  const MAX_VISIBLE_EXERCISES = 4;
  const remainingCount = selectedWeightData.length - MAX_VISIBLE_EXERCISES;

  return (
    <div className="w-dvw h-dvh flex flex-col">
      <RecordNavigationBar />
      <div className="flex-1 bg-fill-neutral-white flex flex-col">
        <div className="px-6 py-4 flex-shrink-0">
          <div className="space-y-2">
            <h1 className="text-heading-l font-bold">{uniqueParts}</h1>
            <h2 className="text-heading-l font-bold">{selectedWeightData.length}가지 운동</h2>
            <div className="flex flex-col gap-2">
              {selectedWeightData.slice(0, MAX_VISIBLE_EXERCISES).map((exercise, index) => (
                <p key={index} className="text-text-neutral-tertiary text-body-m">
                  {exercise.name}
                </p>
              ))}
              {remainingCount > 0 && <p className="text-text-neutral-tertiary text-body-m">...외 {remainingCount}개</p>}
            </div>
          </div>
        </div>
        <div className="flex-1 px-6 pb-4 flex flex-col">
          <WriteWeightForm />
        </div>
      </div>
    </div>
  );
}
