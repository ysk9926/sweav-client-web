import WriteNavigationBar from "@/components/write/navigationbar/WriteNavigationBar";
import WeightItemList from "@/components/write/weight/list/WeightItemList";
import { ExerciseTypeEnum } from "@/types/write";

export default async function WriteWeightPg({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  return (
    <div className="grid grid-rows-[4rem_1fr] h-dvh w-dvw">
      <WriteNavigationBar type={ExerciseTypeEnum.WEIGHT_TRAINING} />
      <WeightItemList date={date} />
    </div>
  );
}
