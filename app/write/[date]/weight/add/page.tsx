import WriteWeightHeading from "@/components/write/weight/write/WriteWeightHeading";
import RecordNavigationBar from "@/components/write/navigationbar/RecordNavigationBar";

interface PageProps {
  params: {
    date: string;
  };
}

export default function WeightAddPg({ params }: PageProps) {
  const { date } = params;
  return (
    <div className="h-dvh w-dvw grid grid-rows-[4rem_1fr]">
      <RecordNavigationBar />
      <WriteWeightHeading date={date} />
    </div>
  );
}
