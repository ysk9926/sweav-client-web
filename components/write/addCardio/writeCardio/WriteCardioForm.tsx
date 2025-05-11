import { IWriteCardioForm } from "@/types/write";

export default function WriteCardioForm({ register }: IWriteCardioForm) {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <span className="text-text-neutral-default font-semibold text-heading-s">얼마나 운동하셨나요?</span>
      <div className="space-x-2">
        <input
          type="string"
          placeholder="운동한 시간"
          {...register("time")}
          className="w-[140px] h-14 px-4 bg-fill-neutral-default rounded-2xl text-center 
          placeholder:font-pretendard placeholder:text-heading-s 
          focus:outline-2 focus:outline-line-brand-default font-outfit font-semibold text-brand-m"
        />
        <span className="text-button-text-neutral-default text-heading-s font-semibold">분</span>
      </div>
    </div>
  );
}
