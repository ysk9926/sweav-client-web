import { useState, useRef, useEffect } from "react";
import { Modal, ModalContent } from "@heroui/react";
import { IExerciseItem } from "@/types/write";

const REPORT_REASONS = [
  { key: "name", label: "운동 이름이 잘 못 표기됐어요." },
  { key: "other", label: "다른 사유" },
];

interface ReportExerciseModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  exercise: IExerciseItem | null;
}

export default function ReportExerciseModal({
  isOpen,
  onOpenChange,
  exercise,
}: ReportExerciseModalProps) {
  const [selectedReason, setSelectedReason] = useState<string | null>(null);
  const [otherReason, setOtherReason] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSelectedReason(null);
      setOtherReason("");
    }
  }, [isOpen]);

  // Scroll to bottom when textarea grows
  useEffect(() => {
    if (selectedReason === "other" && textareaRef.current) {
      textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
    }
  }, [otherReason, selectedReason]);

  const charCount = otherReason.length;
  const isOverLimit = charCount > 300;
  const isSubmitEnabled =
    selectedReason === "name" ||
    (selectedReason === "other" && !!otherReason && !isOverLimit);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      hideCloseButton
      placement="center"
      className="w-full mx-6"
    >
      <ModalContent>
        {() => (
          <div className="w-full flex flex-col items-center p-6">
            <span className="font-semibold text-heading-m text-text-neutral-default mb-2">
              이 운동을 신고하시겠어요?
            </span>
            <span className="text-text-neutral-default text-heading-xs font-semibold">
              다른 유저가 추가한 운동
            </span>
            <span className="text-text-neutral-tertiary text-body-s mb-6">
              신고는 접수되어 검토 후 처리 여부가 결정됩니다.
            </span>
            <div className="w-full flex flex-col gap-3 mb-4">
              {REPORT_REASONS.map((reason) => (
                <button
                  key={reason.key}
                  className={`w-full h-12 rounded-xl text-button-m font-semibold transition-all
                    ${
                      selectedReason === reason.key
                        ? "border-2 border-line-brand-default bg-button-fill-brand-secondary text-button-text-brand-default"
                        : " bg-fill-neutral-secondary text-text-neutral-secondary"
                    }
                  `}
                  onClick={() => setSelectedReason(reason.key)}
                >
                  {reason.label}
                </button>
              ))}
              {selectedReason === "other" && (
                <div className="relative w-full">
                  <textarea
                    ref={textareaRef}
                    className={`w-full h-24 resize-none rounded-xl border px-4 py-3 text-body-m outline-none focus:border-brand-default ${
                      isOverLimit
                        ? "border-red-400"
                        : "border-line-neutral-secondary"
                    }`}
                    placeholder="신고 사유를 입력해주세요."
                    maxLength={301}
                    value={otherReason}
                    onChange={(e) => {
                      if (e.target.value.length <= 300)
                        setOtherReason(e.target.value);
                    }}
                  />
                  <span
                    className={`absolute bottom-2 right-4 text-xs ${
                      isOverLimit
                        ? "text-red-400"
                        : "text-text-neutral-tertiary"
                    }`}
                  >
                    {charCount}/300
                  </span>
                </div>
              )}
            </div>
            <div className="w-full flex gap-3 mt-2">
              <button
                className="w-full h-14 border-2 border-line-brand-default rounded-2xl text-button-text-brand-default font-semibold text-button-l"
                onClick={() => onOpenChange(false)}
              >
                돌아가기
              </button>
              <button
                className={`w-full h-14 rounded-2xl text-button-l font-semibold transition-all
                  ${
                    isSubmitEnabled
                      ? "bg-button-fill-brand-default text-button-text-neutral-white"
                      : "bg-fill-neutral-tertiary text-text-neutral-tertiary"
                  }`}
                disabled={!isSubmitEnabled}
                onClick={() => {
                  /* 신고 처리 로직 */
                }}
              >
                신고하기
              </button>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
