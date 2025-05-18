"use client";

import { useSelectedWeightDataStore } from "@/stores/selectedWeightDataStore";
import { IExerciseItem } from "@/types/write";
import { useState, useEffect, useRef } from "react";
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

export default function WriteWeightHeading() {
  const { selectedWeightData, setSelectedWeightData } =
    useSelectedWeightDataStore();
  const [isReorderMode, setIsReorderMode] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);

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

  // DnD 완료 시 순서 변경
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newSets = Array.from(sets);
    const [removed] = newSets.splice(result.source.index, 1);
    newSets.splice(result.destination.index, 0, removed);
    setValue("sets", newSets);

    // Update selectedWeightDataStore with new order
    const newSelectedWeightData = Array.from(selectedWeightData);
    const [removedExercise] = newSelectedWeightData.splice(
      result.source.index,
      1
    );
    newSelectedWeightData.splice(result.destination.index, 0, removedExercise);
    setSelectedWeightData(newSelectedWeightData);
  };

  // MoveHandle long-press 이벤트 핸들러를 카드에 내려줌
  const handleMoveHandlePointerDown = () => {
    if (!isReorderMode) {
      longPressTimer.current = setTimeout(() => {
        setIsReorderMode(true);
      }, 500); // 0.5초 이상 누르면 진입
    }
  };
  const handleMoveHandlePointerUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };
  const handleCancelReorderMode = () => {
    setIsReorderMode(false);
  };

  // 모든 세트 필드가 채워져 있는지 검사
  const allFilled = Array.isArray(sets)
    ? sets.every((item) =>
        item.setList.every(
          (set) =>
            set.weight !== null &&
            set.weight !== undefined &&
            !Number.isNaN(set.weight) &&
            set.reps !== null &&
            set.reps !== undefined &&
            !Number.isNaN(set.reps)
        )
      )
    : false;

  return (
    <FormProvider {...methods}>
      <div className="h-full flex flex-col justify-between min-h-0 bg-fill-neutral-secondary">
        <div className="h-full overflow-auto min-h-0  relative">
          {/* 상단 알람 */}
          {isReorderMode && (
            <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-fill-neutral-white text-text-neutral-tertiary text-center px-4 py-2 rounded-lg shadow z-50">
              순서변경모드입니다
            </div>
          )}
          <div className="max-w-md p-6">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="exercise-list">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-3"
                  >
                    {sets.length === 0 ? (
                      <div className="text-center text-gray-400 py-8">
                        운동을 추가해보세요!
                      </div>
                    ) : (
                      sets.map((item, idx) => (
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
                              onMoveHandlePointerDown={
                                handleMoveHandlePointerDown
                              }
                              onMoveHandlePointerUp={handleMoveHandlePointerUp}
                              onCancelReorderMode={handleCancelReorderMode}
                            />
                          )}
                        </Draggable>
                      ))
                    )}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="flex justify-center items-center gap-2 mb-4">
            <span className="text-text-neutral-tertiary text-button-m font-semibold">
              운동 추가하기
            </span>
            <PlusIcon color="#bbbab7" />
          </div>
        </div>
        <NextButton isDisabled={isReorderMode} />
      </div>
    </FormProvider>
  );
}
