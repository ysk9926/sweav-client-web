import WriteNavigationBar from "@/components/write/navigationbar/WriteNavigationBar";
import WriteWeightHeading from "@/components/write/weight/write/WriteWeightHeading";
import { ExerciseTypeEnum } from "@/types/write";

export default function WeightAddPg() {
  return (
    <div className="h-dvh w-dvw grid grid-rows-[4rem_1fr]">
      <WriteNavigationBar type={ExerciseTypeEnum.WEIGHT_TRAINING} />
      <WriteWeightHeading />
    </div>
  );
}
