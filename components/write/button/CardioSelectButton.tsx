"use client";

import { useSelectedCardioDataStore } from "@/stores/selectedCardioDataStore";
import { SelectBtnProps, unSelectedExercise } from "@/types/write";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CardioSelectButton({ selectedV, isShort }: SelectBtnProps) {
  const { selectedCardioData, setSelectedCardioData } = useSelectedCardioDataStore();
  const router = useRouter();
  /**
   * 운동을 선택 하였을때 발생하는 핸들러 함수
   * todo - api 연결
   */
  const selectHandler = () => {
    console.log(selectedV);
    if (selectedV === unSelectedExercise) return;
    setSelectedCardioData(selectedV);
    router.push("/write/cardio/add");
  };

  return (
    <div className={`flex flex-col items-center justify-center relative ${isShort ? "pb-5" : "pb-10"}`}>
      <div className=" absolute -top-5 h-5 w-full bg-gradient-to-b from-white/0 to-white/100"></div>
      <button
        onClick={selectHandler}
        className={`${
          selectedV.id !== -1 ? "bg-button-fill-brand-default " : "bg-button-fill-disabled-primary "
        } w-[310px] h-14 px-4 rounded-2xl font-semibold text-button-l text-button-text-neutral-white`}
      >
        선택
      </button>
    </div>
  );
}
