"use client";

import { useSelectedWeightDataStore } from "@/stores/selectedWeightDataStore";
import { useState } from "react";
import WriteWeightBtn from "./WriteWeightBtn";

export default function WriteWeightForm() {
  const { selectedWeightData } = useSelectedWeightDataStore();
  const [minutes, setMinutes] = useState("");

  const handleMinutesChange = (value: string) => {
    // 숫자만 입력 가능하도록
    const numericValue = value.replace(/[^0-9]/g, "");
    setMinutes(numericValue);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 border-t border-line-neutral-secondary pt-12">
        <div className="space-y-4 flex flex-col items-center">
          <div className="text-heading-s font-semibold">얼마나 운동하셨나요?</div>
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={minutes}
              onChange={(e) => handleMinutesChange(e.target.value)}
              className="w-2/6 h-12 bg-fill-neutral-default rounded-2xl text-center text-heading-l font-outfit font-semibold focus:outline-none focus:ring-2 focus:ring-line-brand-default"
              placeholder="0"
            />
            <span className="text-heading-s font-semibold">분</span>
          </div>
        </div>
      </div>
      <div className="sticky bottom-0 left-0 right-0 p-4 bg-fill-neutral-white">
        <WriteWeightBtn minutes={minutes} />
      </div>
    </div>
  );
}
