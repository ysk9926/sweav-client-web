import MoveHandle from "@/shared/icons/MoveHandle";
import { ExerciseItemWithSetInfo, SetInfo } from "./types";
import DotMenu from "@/shared/icons/DotMenu";
import ReorderSimpleCard from "./ReorderSimpleCard";
import { useFormContext, Controller } from "react-hook-form";
import { useState, useRef, useEffect } from "react";

interface DraggableExerciseCardProps {
  item: ExerciseItemWithSetInfo;
  index: number;
  provided?: any;
  snapshot?: any;
  isReorderMode?: boolean;
  onMoveHandlePointerDown?: () => void;
  onMoveHandlePointerUp?: () => void;
  onCancelReorderMode?: () => void;
}

export default function DraggableExerciseCard({
  item,
  index,
  provided,
  snapshot,
  isReorderMode = false,
  onMoveHandlePointerDown,
  onMoveHandlePointerUp,
  onCancelReorderMode,
}: DraggableExerciseCardProps) {
  const { control, getValues, setValue } = useFormContext();
  const setList = getValues(`sets.${index}.setList`);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleAddSet = () => {
    const newSet: SetInfo = {
      setId: Date.now().toString(),
      weight: 0,
      reps: 0,
    };
    setValue(`sets.${index}.setList`, [...setList, newSet]);
  };

  const handleRemoveSet = () => {
    if (setList.length > 1) {
      setValue(`sets.${index}.setList`, setList.slice(0, -1));
    }
  };

  const handleChangeExercise = () => {
    setMenuOpen(false);
    // TODO: 운동 바꾸기 모달 띄우기
  };

  const handleDeleteExercise = () => {
    setMenuOpen(false);
    // TODO: 운동 삭제 로직
  };

  if (isReorderMode) {
    const compactStyle = provided
      ? {
          minHeight: "64px",
          paddingTop: "12px",
          paddingBottom: "12px",
          ...provided.draggableProps.style,
        }
      : {};
    return (
      <ReorderSimpleCard
        exerciseName={item.exerciseName}
        isDragging={snapshot?.isDragging}
        onMoveHandlePointerDown={onMoveHandlePointerDown}
        onMoveHandlePointerUp={onMoveHandlePointerUp}
        onCancelReorderMode={onCancelReorderMode}
        provided={provided}
        style={compactStyle}
      />
    );
  }

  return (
    <div className="bg-fill-neutral-white rounded-xl px-4 py-3 shadow-sm border border-line-neutral-secondary transition  max-w-md mx-auto">
      <div className="flex justify-between items-center mb-2">
        <div
          className="mr-3 cursor-grab"
          onPointerDown={onMoveHandlePointerDown}
          onPointerUp={onMoveHandlePointerUp}
          onPointerLeave={onMoveHandlePointerUp}
        >
          <MoveHandle />
        </div>
        <div className="relative" ref={menuRef}>
          <button onClick={() => setMenuOpen((v) => !v)}>
            <DotMenu />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
              <button
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                onClick={handleChangeExercise}
              >
                운동 바꾸기
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                onClick={handleDeleteExercise}
              >
                운동 지우기
              </button>
            </div>
          )}
        </div>
      </div>
      <span className="font-semibold text-button-l flex-1">
        {item.exerciseName}
      </span>
      <div className="w-full rounded-lg p-4 mt-6 text-body-m text-text-neutral-tertiary border-b border-line-neutral-secondary mb-4">
        <div className=" grid grid-cols-[40px_1fr_1fr] gap-2 mb-2 text-xs">
          <div></div>
          <div className="flex justify-center items-center text-center">kg</div>
          <div className="flex justify-center items-center text-center">
            횟수
          </div>
        </div>
        {setList.map((set: SetInfo, setIdx: number) => (
          <div
            key={set.setId}
            className=" grid grid-cols-[40px_1fr_1fr] gap-2 mb-2 space-y-1"
          >
            <div className="text-xs text-gray-400 flex items-center">
              {setIdx + 1}세트
            </div>
            <div className="flex items-center justify-center">
              <Controller
                name={`sets.${index}.setList.${setIdx}.weight`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full bg-fill-neutral-default px-2 text-center rounded-2xl py-2 text-text-neutral-default font-semibold text-brand-s font-outfit focus:outline-line-brand-default placeholder:text-text-neutral-tertiary placeholder:text-body-m"
                    type="number"
                    placeholder="kg"
                  />
                )}
              />
            </div>
            <div className="flex items-center justify-center">
              <Controller
                name={`sets.${index}.setList.${setIdx}.reps`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full bg-fill-neutral-default px-2 text-center rounded-2xl py-2 text-text-neutral-default font-semibold text-brand-s font-outfit focus:outline-line-brand-default placeholder:text-text-neutral-tertiary placeholder:text-body-m"
                    type="number"
                    placeholder="횟수"
                  />
                )}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-3 px-2 divide-x-1 divide-line-neutral-secondary">
        <button
          onClick={handleRemoveSet}
          className="w-full flex justify-center items-center text-text-etc-coral font-semibold text-button-s"
          disabled={setList.length <= 1}
        >
          세트 삭제 <span className="ml-2 font-bold">ㅡ</span>
        </button>
        <button
          onClick={handleAddSet}
          className="w-full text-brand-default text-sm flex justify-center items-center text-text-brand-secondary"
        >
          <span className="text-center">세트 추가</span>
          <span className="ml-2 text-2xl pb-1">+</span>
        </button>
      </div>
    </div>
  );
}
