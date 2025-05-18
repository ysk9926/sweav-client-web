"use client";

import ArrowBack from "@/shared/icons/ArrowBack";
import PlusIcon from "@/shared/icons/PlusIcon";
import { useSelectedDateStore } from "@/stores/selectedDateStore";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import AddCardio from "../addCardio/AddCardio";
import { ExerciseTypeEnum } from "@/types/write";
import AddWeightModal from "../weight/add/AddWeightModal";

interface IExerciseType {
  type: ExerciseTypeEnum;
  title?: string;
}

export default function WriteNavigationBar({ type, title }: IExerciseType) {
  const router = useRouter();
  const { selectedDate } = useSelectedDateStore();
  const {
    isOpen: cardioIsOpen,
    onOpen: cardioOnOpen,
    onOpenChange: cardioOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: weightIsOpen,
    onOpen: weightOnOpen,
    onOpenChange: weightOnOpenChange,
  } = useDisclosure();

  const modalOpenHandler = () => {
    type === ExerciseTypeEnum.CARDIO_EXERCISE ? cardioOnOpen() : weightOnOpen();
  };
  return (
    <div className="w-full h-16 flex justify-between items-center py-4 px-5">
      <div className="w-6" onClick={router.back}>
        <ArrowBack />
      </div>
      <span className="text-text-neutral-default font-semibold text-heading-xs">
        {title
          ? title
          : `${selectedDate.month}월 ${selectedDate.day}일 운동 기록`}
      </span>
      <div onClick={modalOpenHandler} className="w-6">
        <PlusIcon />
      </div>
      <AddCardio isOpen={cardioIsOpen} onOpenChange={cardioOnOpenChange} />
      <AddWeightModal isOpen={weightIsOpen} onOpenChange={weightOnOpenChange} />
    </div>
  );
}
