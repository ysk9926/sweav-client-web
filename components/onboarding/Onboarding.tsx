"use client";

import { useEffect, useState } from "react";
import { steps } from "./steps/steps";
import OnboardingNavigation from "./OnboardingNavigation";
import { OnboardingData } from "./steps/interface";

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const StepComponent = steps[currentStep - 1].component;
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    gender: 0,
    age: 0,
    activityLevel: "",
  });

  return (
    <div className=" flex flex-col justify-center items-center w-dvw h-dvh">
      {/* 네비게이션 바 */}
      <OnboardingNavigation currentStep={currentStep} totalSteps={steps.length} setCurrentStep={setCurrentStep} />
      {/* FORM */}
      <div className="w-full h-full flex justify-center items-center">
        {/* 단계 컴포넌트 */}
        {StepComponent ? (
          <StepComponent
            onBoardingData={onboardingData}
            setOnboardingData={setOnboardingData}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        ) : (
          <div>해당 컴포넌트가 없습니다.</div>
        )}
      </div>
    </div>
  );
}
