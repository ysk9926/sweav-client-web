"use client";

import { useDisclosure } from "@heroui/react";
import MifflinModal from "./MifflinModal";
import QuestionMark from "@/shared/icons/Questionmark";

export default function MifflinText() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="text-body-s text-text-neutral-tertiary">
      <MifflinModal isOpen={isOpen} onOpenChange={onOpenChange} />
      <div className="flex items-center space-x-1">
        <label onClick={onOpen} className="flex justify-center items-center space-x-1">
          <div className=" rounded-full bg-fill-neutral-default w-[20px] h-[20px] flex justify-center items-center">
            <QuestionMark />
          </div>
          <span className=" text-label-l font-semibold underline">Mifflin-St Jeor</span>
        </label>
        <span>공식을 활용해</span>
      </div>
      <span>적정 칼로리 및 영양분 섭취를 제안하기 위해 활용돼요.</span>
    </div>
  );
}
