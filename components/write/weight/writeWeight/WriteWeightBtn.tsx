"use client";

import { useRouter } from "next/navigation";
import { useSelectedWeightDataStore } from "@/stores/selectedWeightDataStore";

interface Props {
  minutes: string;
}

export default function WriteWeightBtn({ minutes }: Props) {
  const router = useRouter();
  const { selectedWeightData } = useSelectedWeightDataStore();

  const handleSubmit = () => {
    if (!minutes || parseInt(minutes) === 0) return;

    // TODO: API 호출하여 운동 데이터 저장
    console.log("운동 데이터:", {
      exercises: selectedWeightData,
      totalMinutes: parseInt(minutes),
    });

    // 다음 페이지로 이동
    router.push("/write/complete");
  };

  return (
    <button
      onClick={handleSubmit}
      disabled={!minutes || parseInt(minutes) === 0}
      className={`w-full h-14 rounded-2xl font-semibold text-button-l mb-4
        ${
          minutes && parseInt(minutes) > 0
            ? "bg-button-fill-brand-default text-button-text-neutral-white"
            : "bg-button-fill-disabled-primary text-button-text-disabled-primary"
        }
      `}
    >
      다음
    </button>
  );
}
