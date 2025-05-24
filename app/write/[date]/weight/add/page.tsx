import WriteWeightHeading from "@/components/write/weight/write/WriteWeightHeading";
import RecordNavigationBar from "@/components/write/navigationbar/RecordNavigationBar";
import { ExercisePageProps } from "@/app/exercise/[date]/page";

export default function WeightAddPg({ params }: ExercisePageProps) {
  const { date } = params;
  return (
    <div className="h-dvh w-dvw grid grid-rows-[4rem_1fr]">
      <RecordNavigationBar />
      <WriteWeightHeading date={date} />
    </div>
  );
}
