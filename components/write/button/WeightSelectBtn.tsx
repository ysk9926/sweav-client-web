"use client";

import { useSelectedWeightDataStore } from "@/stores/selectedWeightDataStore";
import { IExerciseItem } from "@/types/write";
import { notFound, useRouter } from "next/navigation";

interface Props {
  selectedV: IExerciseItem[];
  isShort: boolean;
  date: string;
}

export default function WeightSelectButton({
  selectedV,
  isShort,
  date,
}: Props) {
  const { selectedWeightData, setSelectedWeightData } =
    useSelectedWeightDataStore();
  const router = useRouter();
  /**
   * 운동을 선택 하였을때 발생하는 핸들러 함수
   * todo - api 연결
   */
  const selectHandler = () => {
    console.log(selectedV);
    if (selectedV.length === 0) return;
    setSelectedWeightData(selectedV);
    router.push(`/write/${date}/weight/add`);
  };

  return (
    <div
      className={`flex flex-col items-center justify-center relative ${
        isShort ? "pb-5" : "pb-10"
      }`}
    >
      <div className=" absolute -top-5 h-5 w-full bg-gradient-to-b from-white/0 to-white/100"></div>
      <button
        onClick={selectHandler}
        className={`${
          selectedV.length !== 0
            ? "bg-button-fill-brand-default "
            : "bg-button-fill-disabled-primary "
        } w-[310px] h-14 px-4 rounded-2xl font-semibold text-button-l text-button-text-neutral-white`}
      >
        선택
      </button>
    </div>
  );
}
