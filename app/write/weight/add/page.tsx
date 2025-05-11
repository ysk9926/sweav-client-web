import WriteNavigationBar from "@/components/write/navigationbar/WriteNavigationBar";
import WriteWeightHeading from "@/components/write/weight/write/WriteWeightHeading";
import { ExerciseTypeEnum } from "@/types/write";

export default function WeightAddPg() {
  return (
    <div>
      <WriteNavigationBar type={ExerciseTypeEnum.WEIGHT_TRAINING} />
      <WriteWeightHeading />
    </div>
  );
}
