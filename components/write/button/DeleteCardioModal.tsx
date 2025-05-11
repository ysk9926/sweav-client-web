"use client";

import { useDeleteExercise } from "@/components/hook/write/useDeleteExercise";
import { DeleteCardioProps } from "@/types/write";
import { Modal, ModalContent } from "@heroui/react";

export default function DeleteCardioModal({ isOpen, onOpenChange, exercise }: DeleteCardioProps) {
  const { mutate: deleteExercise } = useDeleteExercise();
  const handleDelete = () => {
    deleteExercise(exercise.id);
    window.location.reload;
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton placement="center" size="xs">
      <ModalContent>
        {(onClose) => (
          <div className="w-full flex justify-center items-center flex-col space-y-6 p-6">
            <span className="font-semibold text-heading-m text-text-neutral-default">이 운동을 삭제하시겠어요?</span>
            <div className="flex flex-col justify-center items-center text-heading-xs">
              <span className="text-text-neutral-default font-semibold">내가(사용자가) 추가한 운동</span>
              <span className="text-[#F17E61] text-body-s">기록된 내용이 모두 삭제됩니다.</span>
            </div>
            <div className="flex justify-between items-center w-full space-x-3">
              <div
                onClick={onClose}
                className="border-2 border-line-brand-default h-14 flex justify-center items-center w-full rounded-2xl text-button-text-brand-default font-semibold text-button-l"
              >
                <span>돌아가기</span>
              </div>
              <div
                onClick={handleDelete}
                className=" h-14 flex justify-center items-center w-full rounded-2xl bg-button-fill-brand-default text-button-text-neutral-white"
              >
                <span>삭제하기</span>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
