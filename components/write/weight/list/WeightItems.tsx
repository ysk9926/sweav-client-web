import Check from "@/shared/icons/Check";
import { IExerciseItem } from "@/types/write";
import { useState, useRef } from "react";
import DotMenu from "@/shared/icons/DotMenu";
import ReportExerciseModal from "./ReportExerciseModal";
import ReportPopover from "./ReportPopover";

interface Props {
  exercises: IExerciseItem[];
  selectedV: IExerciseItem[];
  selectExercise: (ex: IExerciseItem) => void;
  onOpen?: () => void;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  observerRef: (node: HTMLElement) => void;
  isLoading: boolean;
  isChangeMode?: boolean;
}

export default function WeightItems({
  exercises,
  selectedV,
  selectExercise,
  onOpen,
  isFetchingNextPage,
  observerRef,
  isLoading,
  isChangeMode = false,
}: Props) {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<IExerciseItem | null>(null);
  const [popoverOpenId, setPopoverOpenId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
        <span className="text-text-neutral-secondary text-body-m">
          불러오는 중...
        </span>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
        <span className="text-text-neutral-tertiary text-body-m">
          검색어와 일치하는 운동이 없어요.
        </span>
        <div
          onClick={onOpen}
          className="h-10 px-4 flex justify-center items-center bg-button-fill-brand-default text-button-text-neutral-white rounded-xl text-button-l font-semibold"
        >
          새로운 운동 추가하기
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto min-h-0">
      <ReportExerciseModal
        isOpen={reportModalOpen}
        onOpenChange={setReportModalOpen}
        exercise={reportTarget}
      />
      {exercises.map((exercise, idx) => {
        const selectedIndex = selectedV.findIndex((e) => e.id === exercise.id);
        const isSelected = selectedIndex > -1;
        const anchorRef = useRef<HTMLDivElement>(
          null
        ) as React.RefObject<HTMLDivElement>;

        return (
          <div
            key={exercise.id}
            ref={(el) => {
              if (idx === exercises.length - 1 && el) observerRef(el);
            }}
            className={`
                ${
                  isSelected
                    ? "bg-button-fill-brand-secondary text-text-brand-default"
                    : "bg-fill-neutral-white text-text-neutral-default"
                }
                border-b-1 border-line-neutral-secondary
                h-20 flex items-center justify-between px-5
              `}
          >
            <span
              className="font-semibold text-button-l w-full cursor-pointer"
              onClick={() => selectExercise(exercise)}
            >
              {exercise.name}
            </span>

            {/* 선택 표시 - 모드에 따라 다르게 표시 */}
            {isSelected &&
              (isChangeMode ? (
                <div className="w-6 h-6 flex items-center justify-center">
                  <Check />
                </div>
              ) : (
                <div className="w-6 h-6 flex items-center justify-center rounded-full bg-button-fill-brand-default text-button-text-neutral-white font-semibold text-sm">
                  {selectedIndex + 1}
                </div>
              ))}
            {!isSelected && exercise.isUserCreated && (
              <div className="ml-2 cursor-pointer relative" ref={anchorRef}>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopoverOpenId(
                      popoverOpenId === exercise.id ? null : exercise.id
                    );
                  }}
                >
                  <DotMenu />
                </div>
                <ReportPopover
                  open={popoverOpenId === exercise.id}
                  onClose={() => setPopoverOpenId(null)}
                  onReportClick={() => {
                    setReportTarget(exercise);
                    setReportModalOpen(true);
                  }}
                  anchorRef={anchorRef}
                />
              </div>
            )}
          </div>
        );
      })}

      {isFetchingNextPage && (
        <div className="text-center p-4 text-sm text-gray-500">
          불러오는 중...
        </div>
      )}
    </div>
  );
}
