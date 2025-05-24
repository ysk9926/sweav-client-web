"use client";

import ArrowBack from "@/shared/icons/ArrowBack";
import { useDisclosure } from "@heroui/react";
import { useRouter } from "next/navigation";
import RecordBackModal from "../RecordBackModal";

export default function RecordNavigationBar() {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="w-full h-16 flex justify-between items-center py-4 px-5">
      <div className="w-6" onClick={router.back}>
        <ArrowBack />
      </div>
      <span className="text-text-neutral-default font-semibold text-heading-xs">
        운동 기록
      </span>
      <div
        onClick={onOpen}
        className="w-7 text-[14px] text-text-neutral-tertiary"
      >
        취소
      </div>
      <RecordBackModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </div>
  );
}
