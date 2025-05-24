import WriteCardio from "@/components/write/addCardio/writeCardio/WriteCardio";
import RecordNavigationBar from "@/components/write/navigationbar/RecordNavigationBar";

export default function WriteCardioPage() {
  return (
    <div className="grid grid-rows-[4rem_1fr] h-dvh w-dvw">
      <RecordNavigationBar />
      <WriteCardio />
    </div>
  );
}
