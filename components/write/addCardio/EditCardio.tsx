"use client";

import { EditExerciseProps } from "@/types/write";
import { Modal, ModalContent } from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function EditCardio({
  isOpen,
  onOpenChange,
  exercise,
}: EditExerciseProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{ name: string }>({
    defaultValues: { name: exercise.name },
  });
  const [btnState, setBtnState] = useState(true);

  const name = watch("name") || "";
  const maxLength = 16;

  // 입력 제한 로직
  useEffect(() => {
    if (name.length > maxLength) {
      setValue("name", name.slice(0, maxLength));
    }

    if (name === "" || name === exercise.name) {
      setBtnState(false);
    } else {
      setBtnState(true);
    }
  }, [name, setValue]);

  const editHandler = () => {};
  return (
    <Modal
      isOpen={isOpen}
      placement="bottom"
      onOpenChange={onOpenChange}
      hideCloseButton
      size="xl"
    >
      <ModalContent className="w-dvw h-4/6 rounded-b-none pt-4  px-body-s m-0 ">
        {(onClose) => (
          <div className="relative flex flex-col justify-between items-center h-full w-full">
            <span
              className="absolute right-2 text-text-neutral-tertiary text-sm"
              onClick={onClose}
            >
              취소
            </span>
            <div className="flex flex-col justify-center items-center space-y-2">
              <div className="text-heading-s font-semibold text-text-neutral-default">
                새로운 운동 추가하기
              </div>
              <div className="text-body-s text-text-neutral-tertiary">
                리스트에 없는 운동을 직접 추가해보세요
              </div>
            </div>
            <div className="relative w-full">
              <input
                {...register("name")}
                type="text"
                className="w-full bg-fill-neutral-default h-14 rounded-2xl text-center pl-4 pr-14 text-body-m focus:outline-line-brand-default"
                placeholder="새로운 운동 이름"
              />
              {/* 우측 상단 글자 수 표시 */}
              <span
                className={`
              absolute right-3 top-5 text-sm font-medium
              ${
                name.length === maxLength
                  ? "text-warning"
                  : "text-text-neutral-secondary"
              }
            `}
              >
                {name.length}/{maxLength}
              </span>
            </div>
            <div
              aria-disabled={btnState}
              className={`
                  ${
                    btnState
                      ? "bg-button-fill-brand-default cursor-not-allowed"
                      : "bg-button-fill-disabled-primary"
                  }
                  w-[310px] h-14 rounded-2xl flex justify-center items-center text-text-neutral-white mb-4
                  `}
              onClick={editHandler}
            >
              수정하기
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
