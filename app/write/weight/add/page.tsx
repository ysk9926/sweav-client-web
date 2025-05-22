import WriteWeightHeading from "@/components/write/weight/write/WriteWeightHeading";
import RecordNavigationBar from "@/components/write/navigationbar/RecordNavigationBar";

export default function WeightAddPg() {
  return (
    <div className="h-dvh w-dvw grid grid-rows-[4rem_1fr]">
      <RecordNavigationBar />
      <WriteWeightHeading />
    </div>
  );
}
