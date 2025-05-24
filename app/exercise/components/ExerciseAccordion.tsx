"use client";

import { useState, useRef, useEffect } from "react";
import { ExerciseItemWithSetInfo } from "@/components/write/weight/write/types";
import Drop from "@/shared/icons/DropIcon";
import { ExerciseType, ExerciseTypeEnum } from "@/types/write";
import DotMenu from "@/shared/icons/DotMenu";

interface Props {
  groupName: string;
  groupType: ExerciseType;
  exerciseList: ExerciseItemWithSetInfo[];
  totalMinutes: number;
  calorie?: number;
}

export default function ExerciseAccordion({
  groupName,
  groupType,
  exerciseList,
  totalMinutes,
  calorie,
}: Props) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // 메뉴 바깥 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const handleChangeExercise = () => {
    setMenuOpen(false);
    alert("운동 바꾸기 (구현 필요)");
  };
  const handleDeleteExercise = () => {
    setMenuOpen(false);
    alert("운동 지우기 (구현 필요)");
  };

  return (
    <div className="bg-white rounded-xl shadow p-4">
      <div
        className="flex flex-col justify-between items-center cursor-pointer"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex justify-between items-center w-full pb-2">
          <div className="text-label-lg text-text-neutral-tertiary font-semibold">
            {groupType === ExerciseTypeEnum.WEIGHT_TRAINING
              ? "근력운동"
              : "유산소운동"}
          </div>
          <div
            className="relative"
            ref={menuRef}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="cursor-pointer"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <DotMenu />
            </div>
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
        <div className="w-full flex justify-between items-center">
          <div className="text-heading-m text-text-neutral-default font-semibold">
            {groupName}
          </div>
          <div className="flex items-center gap-2">
            <div className="font-semibold mr-2">
              <span className="font-outfit text-brand-m">{totalMinutes}</span>
              <span className="text-heading-s">분</span>
            </div>
            <span
              style={{
                display: "inline-block",
                transition: "transform 0.2s",
                transform: open ? "rotate(0deg)" : "rotate(180deg)",
              }}
            >
              <Drop />
            </span>
          </div>
        </div>
      </div>
      {open && (
        <div className="mt-2">
          <div
            className={`flex flex-col gap-4 ${
              exerciseList.length > 0
                ? "border-y border-line-neutral-secondary py-4"
                : "border-b border-line-neutral-secondary pb-4"
            }`}
          >
            {exerciseList.map((item) => (
              <div key={item.itemId} className="">
                <div className="w-full grid grid-cols-[1fr_50px_50px] mt-1 pb-2 text-text-neutral-tertiary text-body-m">
                  <div className="font-semibold text-text-neutral-secondary text-heading-xs">
                    {item.exerciseName}
                  </div>
                  <div>kg</div>
                  <div>횟수</div>
                </div>
                {item.setList.map((set, idx) => (
                  <div
                    key={set.setId}
                    className="grid grid-cols-[1fr_50px_50px] text-heading-xs text-text-neutral-secondary pb-2"
                  >
                    <div className="text-body-m text-text-neutral-tertiary">
                      {idx + 1}세트
                    </div>
                    <div>{set.weight}</div>
                    <div>{set.reps}</div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {calorie !== undefined && (
            <div className="flex justify-between mt-4">
              <span className="text-body-m text-text-neutral-tertiary">
                칼로리 소모
              </span>
              <div className="space-x-2">
                <span className="text-heading-xs text-text-neutral-secondary font-semibold">
                  {calorie}
                </span>
                <span className=" text-text-neutral-tertiary text-body-m">
                  kcal
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
