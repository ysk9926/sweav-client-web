import MoveHandle from "@/shared/icons/MoveHandle";
import { ExerciseItemWithSetInfo, SetInfo } from "./types";
import { useState } from "react";
import DotMenu from "@/shared/icons/DotMenu";

interface DraggableExerciseCardProps {
  item: ExerciseItemWithSetInfo;
  provided: any;
  snapshot: any;
}

export default function DraggableExerciseCard({
  item,
  provided,
  snapshot,
}: DraggableExerciseCardProps) {
  // 초기 세트가 비어있으면 3개의 기본 세트 생성
  const initialSetList =
    item.setList.length === 0
      ? Array(3)
          .fill(null)
          .map((_, index) => ({
            setId: `initial-${index}`,
            weight: 0,
            reps: 0,
          }))
      : item.setList;

  const [setList, setSetList] = useState<SetInfo[]>(initialSetList);

  const handleAddSet = () => {
    const newSet: SetInfo = {
      setId: Date.now().toString(), // 임시 ID 생성
      weight: 0,
      reps: 0,
    };
    setSetList([...setList, newSet]);
  };

  const handleRemoveSet = () => {
    if (setList.length > 1) {
      setSetList(setList.slice(0, -1));
    }
  };

  return (
    // 카드 전체 컨테이너
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      className={
        `bg-fill-neutral-white rounded-xl px-4 py-3 shadow-sm border border-line-neutral-secondary transition  max-w-md mx-auto` +
        (snapshot.isDragging
          ? " ring-2 ring-brand-default bg-fill-brand-secondary "
          : "")
      }
      style={{ ...provided.draggableProps.style }}
    >
      {/* 상단: 드래그 핸들 + 운동명 + 옵션 버튼 */}
      <div className="flex justify-between items-center mb-2">
        {/* 드래그 핸들 */}
        <div {...provided.dragHandleProps} className="mr-3 cursor-grab">
          <MoveHandle />
        </div>
        {/* 옵션(더보기) 버튼 */}
        <DotMenu />
      </div>
      {/* 운동명 */}
      <span className="font-semibold text-button-l flex-1">
        {item.exerciseName}
      </span>
      {/* 세트별 입력 영역 */}
      <div className="w-full rounded-lg p-4 mt-6 text-body-m text-text-neutral-tertiary border-b border-line-neutral-secondary mb-4">
        {/* 헤더: kg/횟수 */}
        <div className=" grid grid-cols-[40px_1fr_1fr] gap-2 mb-2 text-xs">
          <div></div>
          <div className="flex justify-center items-center text-center">kg</div>
          <div className="flex justify-center items-center text-center">
            횟수
          </div>
        </div>
        {/* 세트별 입력 필드 */}
        {setList.map((set, idx) => (
          <div
            key={set.setId}
            className=" grid grid-cols-[40px_1fr_1fr] gap-2 mb-2 space-y-1"
          >
            {/* 세트 번호 */}
            <div className="text-xs text-gray-400 flex items-center">
              {idx + 1}세트
            </div>
            {/* 무게 입력 */}
            <div className="flex items-center justify-center">
              <input
                className="w-full bg-fill-neutral-default px-2 text-center rounded-2xl py-2 text-text-neutral-default font-semibold text-brand-s font-outfit focus:outline-line-brand-default placeholder:text-text-neutral-tertiary placeholder:text-body-m"
                type="number"
                placeholder="kg"
              />
            </div>
            <div className="flex items-center justify-center">
              <input
                className="w-full bg-fill-neutral-default px-2 text-center rounded-2xl py-2 text-text-neutral-default font-semibold text-brand-s font-outfit focus:outline-line-brand-default placeholder:text-text-neutral-tertiary placeholder:text-body-m"
                type="number"
                placeholder="횟수"
              />
            </div>
          </div>
        ))}
      </div>
      {/* 세트 추가/삭제 버튼 */}
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
          세트 추가 <span className="ml-2 font-semibold text-lg">+</span>
        </button>
      </div>
    </div>
  );
}
