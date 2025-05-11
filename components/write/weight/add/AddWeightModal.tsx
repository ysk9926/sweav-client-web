import { AddExerciseProps, ExercisePart, ExerciseTypeEnum, WeightPartMap } from "@/types/write";
import { Modal, ModalContent } from "@heroui/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import SelectWeightPart from "./SelectWeightPart";
import { useCreateExercise } from "@/components/hook/write/useCreateExercise";
import { AxiosError } from "axios";

export default function AddWeightModal({ isOpen, onOpenChange }: AddExerciseProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<{ weightName: string }>({
    defaultValues: { weightName: "" },
  });

  const inputV = watch("weightName") || "";
  const maxLength = 16;

  const [selectedPart, setSelectedPart] = useState<ExercisePart[]>([]);
  const [isDisable, setIsDisable] = useState<boolean>(false);

  // 입력 제한 로직
  useEffect(() => {
    if (inputV.length > maxLength) {
      setValue("weightName", inputV.slice(0, maxLength));
    }

    if (inputV === "" || selectedPart.length === 0) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [inputV, setValue, selectedPart]);

  // 뮤테이션
  const { mutate, isPending } = useCreateExercise();
  const createWeight = () => {
    mutate(
      {
        name: inputV,
        type: ExerciseTypeEnum.WEIGHT_TRAINING,
        parts: selectedPart,
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
      <ModalContent className="w-dvw h-4/6 rounded-b-none pt-4 px-body-s m-0">
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
                {...register("weightName")}
                type="text"
                className="w-full bg-fill-neutral-default h-14 rounded-2xl text-center pl-4 pr-14 text-body-m focus:outline-line-brand-default"
                placeholder="새로운 운동 이름"
              />
              {/* 우측 상단 글자 수 표시 */}
              <span
                className={`
                absolute right-3 top-5 text-sm font-medium
                ${inputV.length === maxLength ? "text-warning" : "text-text-neutral-secondary"}
              `}
              >
                {inputV.length}/{maxLength}
              </span>
            </div>
            <div className=" w-full space-y-4">
              <span className="text-heading-xs text-text-neutral-secondary font-semibold">부위 선택</span>
              <SelectWeightPart selectedPart={selectedPart} setSelectedPart={setSelectedPart} />
            </div>
            <div
              onClick={createWeight}
              className={`
                    ${isDisable ? "bg-button-fill-brand-default" : "bg-button-fill-disabled-primary"}
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
