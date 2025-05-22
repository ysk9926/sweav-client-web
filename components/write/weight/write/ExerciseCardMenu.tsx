import React from "react";

interface ExerciseCardMenuProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  menuRef: React.RefObject<HTMLDivElement | null>;
  onChangeExercise: () => void;
  onDeleteExercise: () => void;
}

export default function ExerciseCardMenu({
  menuOpen,
  setMenuOpen,
  menuRef,
  onChangeExercise,
  onDeleteExercise,
}: ExerciseCardMenuProps) {
  return (
    <div className="relative" ref={menuRef}>
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={onChangeExercise}
          >
            운동 바꾸기
          </button>
          <button
            className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
            onClick={onDeleteExercise}
          >
            운동 지우기
          </button>
        </div>
      )}
    </div>
  );
}
