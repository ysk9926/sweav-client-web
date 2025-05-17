"use client";

import { useIsShortViewportHeight } from "@/components/hook/useIsShortHeight";
import { useExerciseSearchDataStore } from "@/stores/exerciseSearchDataStore";
import {
  ExercisePart,
  ExerciseSearchInputForm,
  ExerciseTypeEnum,
  IExerciseItem,
} from "@/types/write";
import { useForm } from "react-hook-form";
import AddWeightModal from "../add/AddWeightModal";
import { useDisclosure } from "@heroui/react";
import ExerciseSearchInput from "../../ExerciseSearchInput";
import { useState } from "react";
import PartFilter from "./PartFilter";
// import { useExerciseSearchInfinite } from "@/components/hook/write/useExerciseSearch"; // 임시코드: 실제 API 호출 대신 목데이터 사용
import WeightItems from "./WeightItems";
import { useInView } from "react-intersection-observer";
import WeightSelectButton from "../../button/WeightSelectBtn";
import SelectedWeightChips from "./SelectedWeightChips";
import { mockWeightTrainingResponse } from "@/api/write/mocks"; // 임시코드: 목데이터 import

export default function WeightItemList() {
  const isShort = useIsShortViewportHeight(600);

  // 검색 인풋 데이터 관리
  const { register, watch, setValue } = useForm<ExerciseSearchInputForm>({
    defaultValues: { searchItem: "" },
  });
  const searchInputData = watch("searchItem");
  const { exerciseSearchData } = useExerciseSearchDataStore();

  // 운동 추가 모달
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // 부위 필터링
  const [part, setPart] = useState<ExercisePart>("ALL");

  // 임시코드: 실제 API 호출 대신 목데이터 사용
  const exerciseList: IExerciseItem[] = mockWeightTrainingResponse.content;
  const hasNextPage = mockWeightTrainingResponse.hasNext;
  const isFetchingNextPage = false;
  const isLoading = false;
  const isError = false;
  const fetchNextPage = () => {}; // 임시코드: 실제 페이지네이션 대신 빈 함수

  // 임시코드: 실제 API 호출 코드 주석 처리
  /*
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useExerciseSearchInfinite({
    keyword: exerciseSearchData.searchData,
    type: ExerciseTypeEnum.WEIGHT_TRAINING,
    part: part === "ALL" ? undefined : part,
  });
  const exerciseList: IExerciseItem[] =
    data?.pages?.flatMap((page) => page.content) ?? [];
  */

  const { ref: observerRef } = useInView({
    threshold: 1.0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  // 운동 선택
  const [selectedV, setSelectedV] = useState<IExerciseItem[]>([]);
  const selectExercise = (exercise: IExerciseItem) => {
    setSelectedV((prev) => {
      const exists = prev.some((e) => e.id === exercise.id);
      if (exists) {
        // 이미 선택된 항목이면 제거
        return prev.filter((e) => e.id !== exercise.id);
      } else {
        // 새로 선택된 항목이면 뒤에 추가
        return [...prev, exercise];
      }
    });
  };

  return (
    <div className="w-dvw h-full flex flex-col justify-between min-h-0">
      <AddWeightModal isOpen={isOpen} onOpenChange={onOpenChange} />

      <ExerciseSearchInput
        setValue={setValue}
        register={register}
        searchInputData={searchInputData}
      />
      <SelectedWeightChips
        exercises={selectedV}
        selecteedExercise={selectExercise}
      />
      <PartFilter selectedPart={part} setSelectedPart={setPart} />
      <WeightItems
        exercises={exerciseList}
        selectedV={selectedV}
        selectExercise={selectExercise}
        onOpen={onOpen}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        observerRef={observerRef}
        isLoading={isLoading}
      />
      <WeightSelectButton selectedV={selectedV} isShort={isShort} />
    </div>
  );
}
