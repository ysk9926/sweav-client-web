"use client";

import { useSelectedWeightDataStore } from "@/stores/selectedWeightDataStore";
import { IExerciseItem } from "@/types/write";
import { useState, useEffect } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import DraggableExerciseCard from "./DraggableExerciseCard";
import { ExerciseItemWithSetInfo } from "./types";

function convertToExerciseItemWithSetInfo(
  items: IExerciseItem[]
): ExerciseItemWithSetInfo[] {
  return items.map((item) => ({
    itemId: item.id.toString(),
    exerciseName: item.name,
    setList: [], // 최초에는 빈 배열로 초기화 (필요시 데이터 매핑)
  }));
}

export default function WriteWeightHeading() {
  const { selectedWeightData } = useSelectedWeightDataStore();

  const [items, setItems] = useState<ExerciseItemWithSetInfo[]>(
    convertToExerciseItemWithSetInfo(selectedWeightData)
  );

  useEffect(() => {
    setItems(convertToExerciseItemWithSetInfo(selectedWeightData));
  }, [selectedWeightData]);

  // DnD 완료 시 순서 변경
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  return (
    <div className="h-full overflow-auto min-h-0 bg-fill-neutral-secondary">
      <div className="max-w-md p-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="exercise-list">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-3"
              >
                {items.map((item, idx) => (
                  <Draggable
                    key={item.itemId}
                    draggableId={item.itemId}
                    index={idx}
                  >
                    {(provided, snapshot) => (
                      <DraggableExerciseCard
                        item={item}
                        provided={provided}
                        snapshot={snapshot}
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
    </div>
  );
}
