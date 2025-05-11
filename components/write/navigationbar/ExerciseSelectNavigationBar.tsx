"use client";

import { setCookie, TokenStorageKey } from "@/components/hook/setCookie";
import ArrowBack from "@/shared/icons/ArrowBack";
import { useSelectedDateStore } from "@/stores/selectedDateStore";
import { useEffect } from "react";

interface WriteData {
  accessToken?: string;
  date?: {
    month: number;
    day: number;
  };
}

declare global {
  interface Window {
    getWriteData?: (data: WriteData | string) => void;
  }
}

export default function ExerciseSelectNavigationBar() {
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  useEffect(() => {
    const getWriteData = (data: WriteData | string) => {
      console.log("[Flutter로부터 받은 데이터]", data); // 데이터 전송 확인
      const parsed: WriteData =
        typeof data === "string" ? JSON.parse(data) : data;

      if (parsed.accessToken) {
        setCookie(parsed.accessToken, TokenStorageKey.accessToken);
      }

      if (parsed.date?.month && parsed.date?.day) {
        setSelectedDate({
          month: parsed.date.month,
          day: parsed.date.day,
        });
      }
    };

    window.getWriteData = getWriteData;
  }, [setSelectedDate]);

  return (
    <div className="w-full h-16 flex justify-between py-4 px-5 items-center">
      <div className="w-6">
        <ArrowBack />
      </div>
      <span className="text-text-neutral-default font-semibold text-heading-xs">{`${selectedDate.month}월 ${selectedDate.day}일 운동 기록`}</span>
      <div className="w-6"></div>
    </div>
  );
}
