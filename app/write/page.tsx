import ExerciseChoiceBtn from "@/components/write/button/ExerciseChoiceBtn";
import ExerciseSelectNavigationBar from "@/components/write/navigationbar/ExerciseSelectNavigationBar";
import Cardio from "@/shared/icons/Cardio";
import WeightExcercise from "@/shared/icons/WeightExcrecise";

export default function Write() {
  return (
    <div className="w-dvw h-dvh flex flex-col justify-between">
      <ExerciseSelectNavigationBar />
      <div className=" w-full h-full space-y-5 flex flex-col justify-between p-5">
        {/* 유산소 */}
        <ExerciseChoiceBtn icon={<Cardio />} label="유산소 운동" linkTo="/write/cardio" />
        {/* 근력 운동 */}
        <ExerciseChoiceBtn icon={<WeightExcercise />} label="근력 운동" linkTo="/write/weight" />
      </div>
    </div>
  );
}
