import { useIsShortViewportHeight } from "@/components/hook/useIsShortHeight";
import { useExerciseSearchDataStore } from "@/stores/exerciseSearchDataStore";
import { useSelectedWeightDataStore } from "@/stores/selectedWeightDataStore";
import {
  ExercisePart,
  ExerciseSearchInputForm,
  IExerciseItem,
} from "@/types/write";
import { useForm } from "react-hook-form";
import AddWeightModal from "../add/AddWeightModal";
import { useDisclosure } from "@heroui/react";
import ExerciseSearchInput from "../../ExerciseSearchInput";
import { useState } from "react";
import PartFilter from "../list/PartFilter";
import WeightItems from "../list/WeightItems";
import { useInView } from "react-intersection-observer";
import { mockWeightTrainingResponse } from "@/api/write/mocks";
import { useRouter } from "next/navigation";

export default function ReplaceWeightExercise() {
  const isShort = useIsShortViewportHeight(600);
  const router = useRouter();

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
  const fetchNextPage = () => {};

  const { ref: observerRef } = useInView({
    threshold: 1.0,
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
  });

  // 단일 선택
  const [selected, setSelected] = useState<IExerciseItem | null>(null);
  const selectExercise = (exercise: IExerciseItem) => {
    setSelected((prev) => (prev && prev.id === exercise.id ? null : exercise));
  };

  // 운동 바꾸기 버튼 핸들러
  const { replaceSelectedWeightData } = useSelectedWeightDataStore();
  const handleReplace = () => {
    if (!selected) return;

    // 현재 URL에서 교체할 운동 이름 가져오기
    const searchParams = new URLSearchParams(window.location.search);
    const exerciseToReplace = searchParams.get("exercise");

    if (exerciseToReplace) {
      replaceSelectedWeightData(exerciseToReplace, selected);
    }
    router.back();
  };

  return (
    <div className="w-dvw h-full flex flex-col justify-between min-h-0">
      <AddWeightModal isOpen={isOpen} onOpenChange={onOpenChange} />

      <ExerciseSearchInput
        setValue={setValue}
        register={register}
        searchInputData={searchInputData}
      />
      <PartFilter selectedPart={part} setSelectedPart={setPart} />
      <WeightItems
        isReplace={true}
        exercises={exerciseList}
        selectedV={selected ? [selected] : []}
        selectExercise={selectExercise}
        onOpen={onOpen}
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
        observerRef={observerRef}
        isLoading={isLoading}
      />
      <div
        className={`flex flex-col items-center justify-center relative ${
          isShort ? "pb-5" : "pb-10"
        }`}
      >
        <div className=" absolute -top-5 h-5 w-full bg-gradient-to-b from-white/0 to-white/100"></div>
        <button
          onClick={handleReplace}
          className={`${
            selected
              ? "bg-button-fill-brand-default "
              : "bg-button-fill-disabled-primary "
          } w-[310px] h-14 px-4 rounded-2xl font-semibold text-button-l text-button-text-neutral-white`}
          disabled={!selected}
        >
          운동 변경
        </button>
      </div>
    </div>
  );
}
