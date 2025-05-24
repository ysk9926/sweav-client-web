import ExerciseChoiceBtn from "@/components/write/button/ExerciseChoiceBtn";
import ExerciseSelectNavigationBar from "@/components/write/navigationbar/ExerciseSelectNavigationBar";
import { ExercisePageProps } from "@/app/exercise/[date]/page";
import Cardio from "@/shared/icons/Cardio";
import WeightExcercise from "@/shared/icons/WeightExcrecise";
import { notFound } from "next/navigation";

export default function Write({ params }: ExercisePageProps) {
  const { date } = params;

  // 날짜 형식 검증 (yyyy-mm-dd)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    notFound();
  }

  return (
    <div className="w-dvw h-dvh flex flex-col justify-between">
      <ExerciseSelectNavigationBar date={date} />
      <div className=" w-full h-full space-y-5 flex flex-col justify-between p-5">
        {/* 유산소 */}
        <ExerciseChoiceBtn
          icon={<Cardio />}
          label="유산소 운동"
          linkTo={`/write/${date}/cardio`}
        />
        {/* 근력 운동 */}
        <ExerciseChoiceBtn
          icon={<WeightExcercise />}
          label="근력 운동"
          linkTo={`/write/${date}/weight`}
        />
      </div>
    </div>
  );
}
