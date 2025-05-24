"use client";

import ArrowBack from "@/shared/icons/ArrowBack";
import { notFound } from "next/navigation";

export default function ExerciseSelectNavigationBar({
  date,
}: {
  date: string;
}) {
  // 날짜 유효성 검사
  const [year, month, day] = date.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    notFound();
  }

  return (
    <div className="w-full h-16 flex justify-between py-4 px-5 items-center">
      <div className="w-6">
        <ArrowBack />
      </div>
      <span className="text-text-neutral-default font-semibold text-heading-xs">{`${month}월 ${day}일 운동 기록`}</span>
      <div className="w-6"></div>
    </div>
  );
}
