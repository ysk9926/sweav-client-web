"use client";

import { useSelectedCardioDataStore } from "@/stores/selectedCardioDataStore";
import { useRouter } from "next/navigation";

interface props {
  inputV: string;
}

export default function WriteCardioBtn({ inputV }: props) {
  const router = useRouter();
  const { selectedCardioData, resetData } = useSelectedCardioDataStore();

  const handleRecord = () => {
    console.log(selectedCardioData);
    console.log("입력 시간", inputV);
    // 기록 api 연동
    resetData();
    router.push("/");
  };
  return (
    <button
      onClick={handleRecord}
      disabled={inputV === ""}
      className={`${
        inputV !== "" ? "bg-button-fill-brand-default " : "bg-button-fill-disabled-primary "
      } w-full h-14 px-4 rounded-2xl font-semibold text-button-l text-button-text-neutral-white flex  justify-center items-center mb-5`}
    >
      <span>기록 완료</span>
    </button>
  );
}
