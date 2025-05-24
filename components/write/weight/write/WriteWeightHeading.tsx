"use client";

import { useSelectedWeightDataStore } from "@/stores/selectedWeightDataStore";
import { IExerciseItem } from "@/types/write";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import DraggableExerciseCard from "./DraggableExerciseCard";
import { ExerciseItemWithSetInfo } from "./types";
import NextButton from "./NextButton";
import { useForm, FormProvider } from "react-hook-form";
import PlusIcon from "@/shared/icons/PlusIcon";
import { useRouter } from "next/navigation";

function convertToExerciseItemWithSetInfo(
  items: IExerciseItem[]
): ExerciseItemWithSetInfo[] {
  return items.map((item) => ({
    itemId: item.id.toString(),
    exerciseName: item.name,
    setList: Array(3)
      .fill(null)
      .map((_, index) => ({
        setId: `initial-${index}`,
        weight: 0,
        reps: 0,
      })),
  }));
}

export default function WriteWeightHeading({ date }: { date: string }) {
  const { selectedWeightData, reorderSelectedWeightData } =
    useSelectedWeightDataStore();
  const [isReorderMode, setIsReorderMode] = useState(false);

  // react-hook-form setup
  const defaultValues = {
    sets: convertToExerciseItemWithSetInfo(selectedWeightData),
  };
  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });
  const { watch, setValue } = methods;
  const sets = watch("sets");

  // 모든 운동의 weight, reps가 0이 아닌지 확인하는 함수
  const isAllExercisesValid = () => {
    return sets.every((exercise) =>
      exercise.setList.every((set) => set.weight > 0 && set.reps > 0)
    );
  };

  // DnD 완료 시 순서 변경
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    // form 데이터 업데이트
    const newSets = Array.from(sets);
    const [removed] = newSets.splice(result.source.index, 1);
    newSets.splice(result.destination.index, 0, removed);
    setValue("sets", newSets);

    // store 데이터 업데이트
    reorderSelectedWeightData(result.source.index, result.destination.index);
  };

  const router = useRouter();

  return (
    <FormProvider {...methods}>
      <div className="h-full flex flex-col justify-between min-h-0 bg-fill-neutral-secondary">
        <div className="h-full overflow-auto min-h-0 relative">
          {/* 헤더 */}
          <div className="sticky top-0 z-10 bg-fill-neutral-secondary">
            <div className="flex items-center justify-between px-6 py-3">
              <div className="flex items-center justify-center text-text-neutral-default">
                <span className=" font-outfit font-semibold text-brand-m">
                  {selectedWeightData.length}
                </span>
                <span className=" font-semibold text-heading-s">종목</span>
              </div>
              <button
                onClick={() => setIsReorderMode(!isReorderMode)}
                className={`px-4 py-2 rounded-xl text-sm ${
                  isReorderMode
                    ? "bg-button-fill-brand-secondary text-button-fill-brand-default border border-line-brand-default"
                    : "bg-button-fill-neutral-white text-text-neutral-tertiary"
                }`}
              >
                {isReorderMode ? "변경 완료" : "순서 변경"}
              </button>
            </div>
          </div>

          <div className="max-w-md p-6">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="exercise-list">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3"
                  >
                    {sets.map((item, idx) => (
                      <Draggable
                        key={item.itemId}
                        draggableId={item.itemId}
                        index={idx}
                      >
                        {(provided, snapshot) => (
                          <DraggableExerciseCard
                            item={item}
                            index={idx}
                            provided={provided}
                            snapshot={snapshot}
                            isReorderMode={isReorderMode}
                            date={date}
                          />
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          {isReorderMode ? null : (
            <div
              className="flex justify-center items-center gap-2 mb-4"
              onClick={() => router.back()}
            >
              <span className="text-text-neutral-tertiary text-button-m font-semibold">
                운동 추가하기
              </span>
              <PlusIcon color="#bbbab7" />
            </div>
          )}
        </div>
        <NextButton
          isDisabled={isReorderMode || !isAllExercisesValid()}
          date={date}
        />
      </div>
    </FormProvider>
  );
}
