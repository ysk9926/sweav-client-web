"use client";

import { useSelectedCardioDataStore } from "@/stores/selectedCardioDataStore";
import { useForm } from "react-hook-form";
import WriteCardioForm from "./WriteCardioForm";
import WriteCardioBtn from "./WriteCardioBtn";
import { useIsShortViewportHeight } from "@/components/hook/useIsShortHeight";

export default function WriteCardio() {
  const isShort = useIsShortViewportHeight(600);
  const { selectedCardioData, resetData } = useSelectedCardioDataStore();

  const { register, watch } = useForm<{ time: string }>({ defaultValues: { time: "" } });
  const inputV = watch("time");

  return (
    <div className={`flex flex-col justify-between items-center px-5 ${isShort && "pb-5"}`}>
      <div className={`w-full space-y-14 pb-4 ${isShort && "space-y-10"}`}>
        <div className="flex flex-col justify-between space-y-6">
          <span className="font-medium text-button-s text-text-neutral-tertiary">수행한 운동</span>
          <span className="text-text-neutral-default font-bold text-heading-xl">{selectedCardioData.name}</span>
        </div>
        <div className="w-full bg-line-neutral-secondary h-[1px]"></div> {/* seperator */}
        <WriteCardioForm register={register} />
      </div>
      <WriteCardioBtn inputV={inputV} />
    </div>
  );
}
