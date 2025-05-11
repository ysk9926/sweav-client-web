"use client";

import { useCreateExercise } from "@/components/hook/write/useCreateExercise";
import { AddExerciseProps, ExerciseTypeEnum } from "@/types/write";
import { Modal, ModalContent } from "@heroui/react";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function AddCardio({ isOpen, onOpenChange }: AddExerciseProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{ title: string }>({
    defaultValues: { title: "" },
  });

  const title = watch("title") || "";
  const maxLength = 16;

  // 입력 제한 로직
  useEffect(() => {
    if (title.length > maxLength) {
      setValue("title", title.slice(0, maxLength));
    }
  }, [title, setValue]);

  const { mutate, isPending } = useCreateExercise();
  const createCardio = () => {
    mutate(
      {
        name: title,
        type: ExerciseTypeEnum.CARDIO_EXERCISE,
      },
      {
        onSuccess: () => {
          window.location.reload();
        },
        onError: (error, variables) => {
          if ((error as AxiosError).isAxiosError) {
            const axiosError = error as AxiosError;
            alert("운동을 추가하지 못하였습니다. 잠시 후 다시 시도해 주세요");
            console.error("Axios 에러:", axiosError);
          } else {
            alert("알 수 없는 에러가 발생했습니다.");
            console.error("기타 에러:", error);
          }
        },
      }
    );
  };

  return (
    <Modal isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange} hideCloseButton size="xl">
      <ModalContent className="w-dvw h-4/6 rounded-b-none pt-4  px-body-s m-0 ">
        {(onClose) => (
          <div className="relative flex flex-col justify-between items-center h-full w-full">
            <span className="absolute right-2 text-text-neutral-tertiary text-sm" onClick={onClose}>
              취소
            </span>
            <div className="flex flex-col justify-center items-center space-y-2">
              <div className="text-heading-s font-semibold text-text-neutral-default">새로운 운동 추가하기</div>
              <div className="text-body-s text-text-neutral-tertiary">리스트에 없는 운동을 직접 추가해보세요</div>
            </div>
            <div className="relative w-full">
              <input
                {...register("title")}
                type="text"
                className="w-full bg-fill-neutral-default h-14 rounded-2xl text-center pl-4 pr-14 text-body-m focus:outline-line-brand-default"
                placeholder="새로운 운동 이름"
              />
              {/* 우측 상단 글자 수 표시 */}
              <span
                className={`
            absolute right-3 top-5 text-sm font-medium
            ${title.length === maxLength ? "text-warning" : "text-text-neutral-secondary"}
          `}
              >
                {title.length}/{maxLength}
              </span>
            </div>
            <div
              onClick={createCardio}
              className={`
                ${title !== "" ? "bg-button-fill-brand-default" : "bg-button-fill-disabled-primary"}
                ${isPending ? "bg-button-fill-disabled-primary" : "bg-button-fill-brand-default"}
                
                w-[310px] h-14 rounded-2xl flex justify-center items-center text-text-neutral-white mb-4
                `}
            >
              추가하기
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
