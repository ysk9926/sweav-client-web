"use client";

import { useState, useEffect, useRef } from "react";
import DotMenu from "@/shared/icons/DotMenu";
import { ExerciseTypeEnum, IExerciseItem } from "@/types/write";
import { useDisclosure } from "@heroui/react";
import EditCardio from "../addCardio/EditCardio";
import DeleteCardioModal from "./DeleteCardioModal";
import EditWeight from "../weight/edit/EditWeight";

interface Params {
  target: IExerciseItem;
}

export default function EditPopOver({ target }: Params) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const {
    isOpen: editCardioIsOpen,
    onOpen: editCardioOnOpen,
    onOpenChange: editCardioOnOpenChange,
  } = useDisclosure(); // 모달 제어용
  const {
    isOpen: editWeightIsOpen,
    onOpen: editWeightOnOpen,
    onOpenChange: editWeightOnOpenChange,
  } = useDisclosure(); // 모달 제어용
  const {
    isOpen: deleteIsOpen,
    onOpen: deleteOnOpen,
    onOpenChange: deleteOnOpenChange,
  } = useDisclosure(); // 모달 제어용
  const popoverRef = useRef<HTMLDivElement>(null); // 팝오버 영역 추적용

  const handleDotClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopoverOpen((prev) => !prev);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopoverOpen(false);
    deleteOnOpen();
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopoverOpen(false);
    if (target.type === ExerciseTypeEnum.CARDIO_EXERCISE) {
      editCardioOnOpen();
    } else {
      editWeightOnOpen();
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsPopoverOpen(false);
      }
    };

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <div onClick={handleDotClick}>
        <DotMenu />
      </div>

      {isPopoverOpen && (
        <div
          className="absolute flex flex-col justify-center items-center -right-3 top-3 z-50 bg-white border border-gray-200 rounded-2xl shadow-md w-24 p-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={handleEdit}
            className="border-b border-line-neutral-secondary pb-1 text-body-m text-text-neutral-tertiary cursor-pointer w-full text-center"
          >
            수정하기
          </div>
          <div
            className=" text-body-m text-[#F17E61] pt-1"
            onClick={handleDelete}
          >
            삭제하기
          </div>
        </div>
      )}

      {/* 모달 */}
      <EditCardio
        isOpen={editCardioIsOpen}
        onOpenChange={editCardioOnOpenChange}
        exercise={target}
      />
      <EditWeight
        isOpen={editWeightIsOpen}
        onOpenChange={editWeightOnOpenChange}
        exercise={target}
      />
      <DeleteCardioModal
        isOpen={deleteIsOpen}
        onOpenChange={deleteOnOpenChange}
        exercise={target}
      />
    </div>
  );
}
