import { useEffect, useState } from "react";
import { ActivityLevel, OnboardingProps } from "./interface";
import MifflinText from "./mifflin/MifflinText";
import ActivityButton from "./shared/ActiityBtn";

export default function Step5({ onBoardingData, setOnboardingData, currentStep, setCurrentStep }: OnboardingProps) {
  const [clickValue, setClickValue] = useState<number>(0);

  useEffect(() => {
    if (!onBoardingData.activityLevel) return;

    const foundKey = Object.entries(ActivityLevel).find(([key, value]) => value === onBoardingData.activityLevel);

    if (foundKey) {
      setClickValue(Number(foundKey[0]));
    }
  }, [currentStep]);

  const clickHandler = () => {
    if (clickValue === 0) return null;

    const updatedData = {
      ...onBoardingData,
      activityLevel: ActivityLevel[clickValue],
    };

    setOnboardingData(updatedData);

    const jsonDataString = JSON.stringify(updatedData);

    if (typeof window !== "undefined" && window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler("receiveOnboardingData", jsonDataString);
      console.log("📢 Flutter로 전송된 데이터 (JSON String):", jsonDataString);
    } else {
      console.log("⚠️ Flutter WebView 환경이 아닙니다.");
    }
  };

  return (
    <div className=" w-full h-full p-10 pt-3 flex flex-col justify-between space-y-4">
      {/* header */}
      <div className=" space-y-4">
        {/* header */}
        <span className="text-heading-m text-text-neutral-default font-semibold">활동량이 얼마나 되시나요?</span>
        {/* mifflin */}
        <MifflinText />
      </div>
      {/* activity Level */}
      <div className="flex flex-col space-y-4 justify-center items-center">
        <ActivityButton label="몸을 거의 안 움직여요" isActive={clickValue === 1} onClick={() => setClickValue(1)} />
        <ActivityButton label="가벼운 산책 정도만 해요" isActive={clickValue === 2} onClick={() => setClickValue(2)} />
        <ActivityButton label="규칙적인 활동을 해요" isActive={clickValue === 3} onClick={() => setClickValue(3)} />
        <ActivityButton label="거의 매일 운동을 해요" isActive={clickValue === 4} onClick={() => setClickValue(4)} />
        <ActivityButton
          label="매일 강도 높은 운동을 해요"
          isActive={clickValue === 5}
          onClick={() => setClickValue(5)}
        />
      </div>
      {/* next - btn */}
      {clickValue !== 0 ? (
        <button
          type="button"
          onClick={clickHandler}
          className="bg-button-fill-brand-default h-14 rounded-2xl flex justify-center items-center"
        >
          <span className="text-button-text-neutral-white text-button-l">다음</span>
        </button>
      ) : (
        <div className="h-14"></div>
      )}
    </div>
  );
}
