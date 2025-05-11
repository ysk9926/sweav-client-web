import { useForm } from "react-hook-form";
import { OnboardingProps, Step4Form } from "./interface";
import MifflinText from "./mifflin/MifflinText";
import { useEffect } from "react";
import { useIsShortViewportHeight } from "@/components/hook/useIsShortHeight";

export default function Step4({ onBoardingData, setOnboardingData, currentStep, setCurrentStep }: OnboardingProps) {
  const isShort = useIsShortViewportHeight(400);

  const { watch, register, setValue } = useForm<Step4Form>();
  const inputValue = watch("age"); // 숫자로 변환하지 않음

  useEffect(() => {
    if (onBoardingData.age !== 0) {
      setValue("age", onBoardingData.age);
    }
  }, [currentStep]);

  const clickHandler = () => {
    if (!inputValue || Number(inputValue) === 0) return null;

    setOnboardingData((prev) => ({
      ...prev,
      age: Number(inputValue),
    }));

    setCurrentStep(currentStep + 1);
  };

  return (
    <div className={`w-full h-full p-12 flex flex-col justify-between space-y-4 ${isShort ? "pb-4" : "pb-10"}`}>
      {/* header */}
      <div className=" space-y-4">
        {/* header */}
        <span className="text-heading-m text-text-neutral-default font-semibold">나이는 어떻게 되시나요?</span>
        {/* mifflin */}
        <MifflinText />
      </div>
      {/* input */}
      <div className="flex flex-col justify-center items-center space-y-[1.33333rem]">
        {/* text */}
        <span className="text-text-neutral-tertiary">만 나이로 입력해주세요.</span>
        {/* age input */}
        <input
          {...register("age")}
          type="number"
          className="bg-fill-neutral-default w-[120px] h-14 rounded-2xl font-outfit text-center font-semibold text-button-m focus:outline-2 outline-line-brand-default"
          placeholder="만 나이"
        />
      </div>
      {/* next - btn */}
      {inputValue && Number(inputValue) !== 0 ? (
        <button
          type="button"
          onClick={clickHandler}
          className="bg-button-fill-brand-default h-14 rounded-xl flex justify-center items-center"
        >
          <span className="text-button-text-neutral-white text-button-l">다음</span>
        </button>
      ) : (
        <div className="h-14"></div>
      )}
    </div>
  );
}
