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
import { useExerciseSearchInfinite } from "@/components/hook/write/useExerciseSearch";
import { useInView } from "react-intersection-observer";
import { setCookie, TokenStorageKey } from "@/components/hook/setCookie";
import { useExerciseSearchDataStore } from "@/stores/exerciseSearchDataStore";

export default function CardioListItems() {
  // 버튼 pb 관련련
  const isShort = useIsShortViewportHeight(600);

  // 검색 인풋 데이터 관리
  const { register, watch, setValue } = useForm<ExerciseSearchInputForm>();
  const searchInputData = watch("searchItem") || "";
  const { exerciseSearchData } = useExerciseSearchDataStore();

  // 운동 데이터 서버 통신
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
  const { ref: observerRef } = useInView({
    threshold: 1.0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });
  const exerciseList: IExerciseItem[] =
    data?.pages?.flatMap((page) => page.content) ?? [];

  // 운동 선택 관련
  const [selectedV, setSelectedV] = useState<IExerciseItem>(unSelectedExercise);
  const selectExercise = (exercise: IExerciseItem) => {
    setSelectedV((prev) =>
      prev.id === exercise.id ? unSelectedExercise : exercise
    );
  };

  // 운동 추가 모달
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // 새로운 운동 추가 관련 애니메이션
  // const [newExercise, setNewExercise] = useState<number>(-1);
  // const itemRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  // useEffect(() => {
  //   setCookie(
  //     TokenStorageKey.accessToken,
  //     "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJTV0VBViIsImlhdCI6MTc0NDQ1ODYzMSwiZXhwIjoyMDU1NDk4NjMxLCJ1c2VySWQiOjc0MjY1Njg2OTU1Nzg2MjR9.G9KRCpW2MTyCxWJKJc8BfosK_pUa5xgyqBu-Rd80M1tNu8nxYsxxaDta536ugzmj67cfXFtlIqjc6thWt_6REQ"
  //   );
  // const savedId = localStorage.getItem("newExerciseId");
  // if (savedId) {
  //   const Id = Number(savedId);

  // setTimeout(() => {
  //   setNewExercise(Id);
  //   const el = itemRefs.current[Id];
  //   if (el) {
  //     el.scrollIntoView({ behavior: "smooth", block: "center" });
  //   }
  // }, 100);

  // setTimeout(() => setNewExercise(Id), 150);
  // setTimeout(() => setNewExercise(-1), 600);
  // localStorage.removeItem("newExerciseId");
  // }
  // }, []);

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
        // newExercise={newExercise}
        // itemRefs={itemRefs}
        selectExercise={selectExercise}
        onOpen={onOpen}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        observerRef={observerRef}
        isLoading={isLoading}
      />
      <CardioSelectButton selectedV={selectedV} isShort={isShort} />
    </div>
  );
}
