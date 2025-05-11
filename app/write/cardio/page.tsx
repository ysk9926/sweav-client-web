import CardioListItems from "@/components/write/addCardio/CaldioList";
import WriteNavigationBar from "@/components/write/navigationbar/WriteNavigationBar";
import { ExerciseTypeEnum } from "@/types/write";

export default function Carodio() {
  return (
    <div className="grid grid-rows-[4rem_1fr] h-dvh w-dvw">
      {/* 네비게이션 바 */}
      <WriteNavigationBar type={ExerciseTypeEnum.CARDIO_EXERCISE} />
      {/* 운동 리스트 */}
      <CardioListItems />
    </div>
  );
}
