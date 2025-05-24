import WriteNavigationBar from "@/components/write/navigationbar/WriteNavigationBar";
import WeightItemList from "@/components/write/weight/list/WeightItemList";
import { ExerciseTypeEnum } from "@/types/write";
import { ExercisePageProps } from "@/app/exercise/[date]/page";

export default function WriteWeightPg({ params }: ExercisePageProps) {
  const { date } = params;
  return (
    <div className="grid grid-rows-[4rem_1fr] h-dvh w-dvw">
      <WriteNavigationBar type={ExerciseTypeEnum.WEIGHT_TRAINING} />
      <WeightItemList date={date} />
    </div>
  );
}
