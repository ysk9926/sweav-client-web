import { OnboardingProps } from "./interface";
import { useEffect, useState } from "react";
import MifflinText from "./mifflin/MifflinText";
import { useIsShortViewportHeight } from "@/components/hook/useIsShortHeight";

export default function Step3({ onBoardingData, setOnboardingData, currentStep, setCurrentStep }: OnboardingProps) {
  const isShort = useIsShortViewportHeight(400);

  const [clickValue, setClickValue] = useState<number>(0);

  useEffect(() => {
    if (onBoardingData.gender !== 0) {
      setClickValue(onBoardingData.gender);
    }
  }, [currentStep]);

  const clickHandler = () => {
    if (clickValue !== 0) {
      setOnboardingData((prev) => ({
        ...prev,
        gender: Number(clickValue),
      }));

      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div
      className={` w-full h-full p-12 flex flex-col justify-between space-y-4 ${isShort ? "pb-4" : "pb-[3.33333rem]"}`}
    >
      {/* content */}
      <div className=" space-y-4">
        {/* title */}
        <span className="text-heading-m text-text-neutral-default font-semibold">성별을 알려주세요.</span>
        {/* sub title */}
        <MifflinText />
      </div>
      {/* form */}
      <div className=" flex justify-between space-x-8">
        {/* man btm */}
        <button
          type="button"
          onClick={() => setClickValue(1)}
          className={` 
            ${
              clickValue === 1
                ? "border-2 border-button-line-brand-default bg-button-fill-brand-secondary text-text-brand-default"
                : "bg-fill-neutral-secondary"
            }
            w-full h-14  rounded-xl text-button-m flex justify-center items-center
            `}
        >
          <span>남자</span>
        </button>
        {/* women btn */}
        <div
          onClick={() => setClickValue(2)}
          className={` 
            ${
              clickValue === 2
                ? "border-2 border-button-line-brand-default bg-button-fill-brand-secondary text-text-brand-default"
                : "bg-fill-neutral-secondary"
            }
            w-full h-14  rounded-xl text-button-m flex justify-center items-center
            `}
        >
          <span>여자</span>
        </div>
      </div>
      {/* next - btn */}
      {clickValue !== 0 ? (
        <div
          onClick={clickHandler}
          className="bg-button-fill-brand-default h-14 rounded-xl flex justify-center items-center"
        >
          <span className="text-button-text-neutral-white text-button-l">다음</span>
        </div>
      ) : (
        <div className="h-14"></div>
      )}
    </div>
  );
}
