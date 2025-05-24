import WriteWeightHeading from "@/components/write/weight/write/WriteWeightHeading";
import RecordNavigationBar from "@/components/write/navigationbar/RecordNavigationBar";

export default async function WeightAddPg({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  return (
    <div className="h-dvh w-dvw grid grid-rows-[4rem_1fr]">
      <RecordNavigationBar />
      <WriteWeightHeading date={date} />
    </div>
  );
}
