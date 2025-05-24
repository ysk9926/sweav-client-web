"use client";

import { useSelectedWeightDataStore } from "@/stores/selectedWeightDataStore";
import {
  ExercisePart,
  ExerciseSearchInputForm,
  IExerciseItem,
} from "@/types/write";
import { useForm } from "react-hook-form";
import ExerciseSearchInput from "@/components/write/ExerciseSearchInput";
import { useState, useEffect } from "react";
import PartFilter from "@/components/write/weight/list/PartFilter";
import WeightItems from "@/components/write/weight/list/WeightItems";
import { useInView } from "react-intersection-observer";
import { mockWeightTrainingResponse } from "@/api/write/mocks";
import { useRouter, useSearchParams } from "next/navigation";
import ArrowBack from "@/shared/icons/ArrowBack";
import AddWeightModal from "@/components/write/weight/add/AddWeightModal";
import { useDisclosure } from "@heroui/react";
import PlusIcon from "@/shared/icons/PlusIcon";

export default function ChangeExercisePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const exerciseIndex = parseInt(searchParams.get("index") || "0", 10);

  // 검색 인풋 데이터 관리
  const { register, watch, setValue } = useForm<ExerciseSearchInputForm>({
    defaultValues: { searchItem: "" },
  });
  const searchInputData = watch("searchItem");

  // 부위 필터링
  const [part, setPart] = useState<ExercisePart>("ALL");

  // 임시코드: 실제 API 호출 대신 목데이터 사용
  const exerciseList: IExerciseItem[] = mockWeightTrainingResponse.content;
  const hasNextPage = mockWeightTrainingResponse.hasNext;
  const isFetchingNextPage = false;
  const isLoading = false;
  const isError = false;
  const fetchNextPage = () => {}; // 임시코드: 실제 페이지네이션 대신 빈 함수

  const { ref: observerRef } = useInView({
    threshold: 1.0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  // 운동 선택
  const { selectedWeightData, setSelectedWeightData } =
    useSelectedWeightDataStore();
  const [selectedV, setSelectedV] = useState<IExerciseItem[]>([]);

  // 현재 선택된 운동을 초기값으로 설정
  useEffect(() => {
    if (selectedWeightData[exerciseIndex]) {
      setSelectedV([selectedWeightData[exerciseIndex]]);
    }
  }, [exerciseIndex, selectedWeightData]);

  const selectExercise = (exercise: IExerciseItem) => {
    setSelectedV([exercise]); // 단일 선택만 가능하도록 수정
  };

  const handleChangeExercise = () => {
    if (selectedV.length === 1) {
      const newWeightData = [...selectedWeightData];
      newWeightData[exerciseIndex] = selectedV[0];
      setSelectedWeightData(newWeightData);
      router.back();
    }
  };

  const {
    isOpen: weightIsOpen,
    onOpen: weightOnOpen,
    onOpenChange: weightOnOpenChange,
  } = useDisclosure();

  const modalOpenHandler = () => {
    weightOnOpen();
  };

  return (
    <div className="w-dvw h-dvh flex flex-col justify-between min-h-0 bg-fill-neutral-white">
      {/* 헤더 */}
      <div className="sticky top-0 z-10 bg-fill-neutral-white pt-4">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => router.back()}>
            <ArrowBack />
          </button>
          <span className="text-heading-xs font-semibold">운동 종목 변경</span>
          <div>
            <div onClick={modalOpenHandler} className="w-6">
              <PlusIcon />
            </div>
            <AddWeightModal
              isOpen={weightIsOpen}
              onOpenChange={weightOnOpenChange}
            />
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="flex-1 flex flex-col min-h-0 pt-2">
        <ExerciseSearchInput
          setValue={setValue}
          register={register}
          searchInputData={searchInputData}
        />
        <PartFilter selectedPart={part} setSelectedPart={setPart} />
        <WeightItems
          exercises={exerciseList}
          selectedV={selectedV}
          selectExercise={selectExercise}
          isFetchingNextPage={isFetchingNextPage}
          hasNextPage={hasNextPage}
          observerRef={observerRef}
          isLoading={isLoading}
          isChangeMode={true}
        />
      </div>

      {/* 하단 버튼 */}
      <div className="flex flex-col items-center justify-center relative pb-10">
        <div className="absolute -top-5 h-5 w-full bg-gradient-to-b from-white/0 to-white/100"></div>
        <button
          onClick={handleChangeExercise}
          className={`${
            selectedV.length === 1
              ? "bg-button-fill-brand-default"
              : "bg-button-fill-disabled-primary"
          } w-[310px] h-14 px-4 rounded-2xl font-semibold text-button-l text-button-text-neutral-white`}
        >
          선택
        </button>
      </div>
    </div>
  );
}
