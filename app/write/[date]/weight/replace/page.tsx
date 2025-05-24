"use client";

import ReplaceWeightExercise from "@/components/write/weight/write/ReplaceWeightExercise";
import WriteNavigationBar from "@/components/write/navigationbar/WriteNavigationBar";
import { ExerciseTypeEnum } from "@/types/write";

export default function ReplaceExercisePage() {
  return (
    <div className="h-dvh w-dvw grid grid-rows-[4rem_1fr]">
      <WriteNavigationBar
        type={ExerciseTypeEnum.WEIGHT_TRAINING}
        title="운동 종목 변경"
      />
      <ReplaceWeightExercise />
    </div>
  );
}
