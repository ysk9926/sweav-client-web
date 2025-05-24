"use client";

import {
  ExerciseSearchInputForm,
  ExerciseTypeEnum,
  IExerciseItem,
  unSelectedExercise,
} from "@/types/write";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { useIsShortViewportHeight } from "../../hook/useIsShortHeight";
import { useDisclosure } from "@heroui/react";
import AddCardio from "./AddCardio";
import ExerciseSearchInput from "../ExerciseSearchInput";
import ExerciseListItems from "./CaldioListItems";
import CardioSelectButton from "../button/CardioSelectButton";
import { useInView } from "react-intersection-observer";
import { setCookie, TokenStorageKey } from "@/components/hook/setCookie";
import { useExerciseSearchDataStore } from "@/stores/exerciseSearchDataStore";
import { mockCardioExerciseResponse } from "@/api/write/mocks";

export default function CardioListItems({ date }: { date: string }) {
  // 버튼 pb 관련련
  const isShort = useIsShortViewportHeight(600);

  // 검색 인풋 데이터 관리
  const { register, watch, setValue } = useForm<ExerciseSearchInputForm>();
  const searchInputData = watch("searchItem") || "";
  const { exerciseSearchData } = useExerciseSearchDataStore();

  // 임시코드: 실제 API 호출 대신 목데이터 사용
  const exerciseList: IExerciseItem[] = mockCardioExerciseResponse.content;
  const hasNextPage = mockCardioExerciseResponse.hasNext;
  const isFetchingNextPage = false;
  const isLoading = false;
  const isError = false;
  const fetchNextPage = () => {}; // 임시코드: 실제 페이지네이션 대신 빈 함수

  // 기존코드: 실제 API 호출
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
    type: ExerciseTypeEnum.CARDIO_EXERCISE,
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

  // 운동 선택 관련
  const [selectedV, setSelectedV] = useState<IExerciseItem>(unSelectedExercise);
  const selectExercise = (exercise: IExerciseItem) => {
    setSelectedV((prev) =>
      prev.id === exercise.id ? unSelectedExercise : exercise
    );
  };

  // 운동 추가 모달
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="h-full flex flex-col justify-between min-h-0">
      <AddCardio isOpen={isOpen} onOpenChange={onOpenChange} />

      <ExerciseSearchInput
        setValue={setValue}
        register={register}
        searchInputData={searchInputData}
      />
      <ExerciseListItems
        exercises={exerciseList}
        selectedV={selectedV}
        selectExercise={selectExercise}
        onOpen={onOpen}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        observerRef={observerRef}
        isLoading={isLoading}
      />
      <CardioSelectButton selectedV={selectedV} isShort={isShort} date={date} />
    </div>
  );
}
