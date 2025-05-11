"use client";

import Search from "@/shared/icons/Search";
import { useExerciseSearchDataStore } from "@/stores/exerciseSearchDataStore";
import DeleteBtn from "../../../shared/icons/DeleteBtn";
import { ExerciseSearchData, SearchBtnProps } from "@/types/write";

export default function SearchBtn({ searchInputData, setValue }: SearchBtnProps) {
  const { exerciseSearchData, setExerciseSearchData, resetData } = useExerciseSearchDataStore();

  const searchHandler = () => {
    if (exerciseSearchData.searchData === "") {
      setExerciseSearchData({ searchData: searchInputData });
    }
    if (exerciseSearchData.searchData !== "") {
      setValue("searchItem", "");
      resetData();
    }
  };

  return (
    <div
      onClick={searchHandler}
      className={`w-4 absolute  ${exerciseSearchData.searchData === "" ? "right-10 bottom-3" : "right-8 bottom-4"}`}
    >
      {exerciseSearchData.searchData === "" ? <Search /> : <DeleteBtn />}
    </div>
  );
}
