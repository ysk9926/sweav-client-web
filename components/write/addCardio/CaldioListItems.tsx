import Check from "@/shared/icons/Check";
import { IExerciseItem } from "@/types/write";
import { RefCallback } from "react";
import EditPopOver from "../button/EditPopOver";

type Props = {
  exercises: IExerciseItem[];
  selectedV: IExerciseItem;
  // newExercise: number;
  // itemRefs: React.MutableRefObject<{ [key: number]: HTMLDivElement | null }>;
  selectExercise: (exercise: IExerciseItem) => void;
  onOpen: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean | undefined;
  observerRef: RefCallback<Element>;
  isLoading: boolean;
};

export default function ExerciseListItems({
  exercises,
  selectedV,
  // newExercise,
  // itemRefs,
  selectExercise,
  onOpen,
  isFetchingNextPage,
  hasNextPage,
  observerRef,
  isLoading,
}: Props) {
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
        <span className="text-text-neutral-secondary text-body-m">불러오는 중...</span>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
        <span className="text-text-neutral-tertiary text-body-m">검색어와 일치하는 운동이 없어요.</span>
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
      {exercises.map((exercise, index) => {
        const isLast = index === exercises.length - 1;

        return (
          <div
            key={exercise.id}
            ref={(el) => {
              // itemRefs.current[exercise.id] = el;
              if (isLast && el) observerRef(el);
            }}
            className={`${
              selectedV.id === exercise.id
                ? "bg-button-fill-brand-secondary text-text-brand-default"
                : // : newExercise === exercise.id
                  // ? "bg-button-fill-brand-secondary"
                  "bg-fill-neutral-white text-text-neutral-default"
            } border-b-1 border-line-neutral-secondary h-20 flex items-center justify-between px-5`}
          >
            <span className=" font-semibold text-button-l w-full " onClick={() => selectExercise(exercise)}>
              {exercise.name}
            </span>
            {selectedV.id === exercise.id ? (
              <div className="w-[14px]">
                <Check />
              </div>
            ) : (
              exercise.isUserCreated && <EditPopOver target={exercise} />
            )}
          </div>
        );
      })}
      {/* 로딩 중 메시지 */}
      {isFetchingNextPage && <div className="text-center p-4 text-sm text-gray-500">불러오는 중...</div>}
    </div>
  );
}
