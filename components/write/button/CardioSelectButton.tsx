"use client";

import { SelectBtnProps } from "@/types/write";
import { useRouter } from "next/navigation";

interface Props extends SelectBtnProps {
  date: string;
}

export default function CardioSelectButton({
  selectedV,
  isShort,
  date,
}: Props) {
  const router = useRouter();
  const selectHandler = () => {
    if (selectedV.id === -1) return;
    router.push(`/write/${date}/cardio/add`);
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
          selectedV.id !== -1
            ? "bg-button-fill-brand-default "
            : "bg-button-fill-disabled-primary "
        } w-[310px] h-14 px-4 rounded-2xl font-semibold text-button-l text-button-text-neutral-white`}
      >
        선택
      </button>
    </div>
  );
}
