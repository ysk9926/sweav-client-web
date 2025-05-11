"use client";

import { useSelectedDateStore } from "@/stores/selectedDateStore";
import { ExerciseChoiceBtnProps, WriteDate } from "@/types/write";
import { useRouter } from "next/navigation";

export default function ExerciseChoiceBtn({ icon, label, linkTo }: ExerciseChoiceBtnProps) {
  const route = useRouter();
  const { setSelectedDate } = useSelectedDateStore();

  const clickHandler = () => {
    route.push(linkTo);
  };

  return (
    <div
      onClick={clickHandler}
      className=" border-2 border-line-brand-secondary h-full flex justify-center items-center rounded-xl"
    >
      <div className="flex flex-col justify-center items-center space-y-7">
        {/* 유산소 아이콘 */}
        {icon}
        <span className="text-text-neutral-default font-semibold text-heading-s">{label}</span>
      </div>
    </div>
  );
}
