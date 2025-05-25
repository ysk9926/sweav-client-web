"use client";

import { notFound } from "next/navigation";
import { useAccessToken } from "@/app/exercise/components/hook/useAccessToken";
import ExerciseAccordion from "@/app/exercise/components/ExerciseAccordion";
import { exerciseGroupMock } from "@/app/exercise/components/mock/exerciseMock";
import PlusIcon from "@/shared/icons/PlusIcon";
import { useRouter } from "next/navigation";

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const router = useRouter();
  const { date } = await params;
  // const accessToken = useAccessToken();

  // if (!accessToken) {
  //   return <div>다시 요청해주세요ㅠㅠ</div>;
  // }

  // 날짜 형식 검증 (yyyy-mm-dd)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    notFound();
  }

  // 날짜 유효성 검사
  const [year, month, day] = date.split("-").map(Number);
  const dateObj = new Date(year, month - 1, day);
  if (
    dateObj.getFullYear() !== year ||
    dateObj.getMonth() !== month - 1 ||
    dateObj.getDate() !== day
  ) {
    notFound();
  }
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const dayOfWeek = days[dateObj.getDay()];

  const handleAddExercise = () => {
    router.push(`/write/${date}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-label-lg text-text-neutral-secondary font-semibold mb-4">
        {month}월 {day}일 {dayOfWeek}요일
      </h1>
      <div className="flex flex-col gap-4">
        {exerciseGroupMock.map((group) => (
          <ExerciseAccordion
            key={group.groupName}
            groupName={group.groupName}
            groupType={group.groupType}
            exerciseList={group.exerciseList}
            totalMinutes={group.totalMinutes}
            calorie={group.calorie}
          />
        ))}
      </div>
      <button
        className="w-full mt-6 py-8 bg-fill-neutral-default rounded-xl text-gray-500 font-semibold flex justify-center items-center"
        onClick={handleAddExercise}
      >
        <span className="text-button-l font-semibold text-text-neutral-tertiary pr-2">
          운동 추가하기
        </span>
        <PlusIcon color="#BBBAB7" />
      </button>
    </div>
  );
}
