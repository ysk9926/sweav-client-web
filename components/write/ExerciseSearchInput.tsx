import SearchBtn from "./button/SearchBtn";
import { SearchInputProps } from "@/types/write";

export default function ExerciseSearchInput({ setValue, register, searchInputData }: SearchInputProps) {
  return (
    <div className="px-5 mb-4 relative h-10">
      <input
        type="text"
        {...register("searchItem")}
        className="bg-fill-neutral-default w-full h-10 rounded-full px-4 placeholder:text-text-neutral-secondary text-body-m focus:outline-line-brand-default"
        placeholder="검색"
      />
      <SearchBtn searchInputData={searchInputData} setValue={setValue} />
    </div>
  );
}
