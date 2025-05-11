"use client";

import { useDisclosure } from "@heroui/react";
import ArrowBack from "../../shared/icons/ArrowBack";

interface Props {
  currentStep: number;
  totalSteps: number;
  setCurrentStep: (step: number) => void;
}

export default function OnboardingNavigation({ currentStep, totalSteps, setCurrentStep }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // 홈으로 이동
  // const goHome = () => {
  //   if (typeof window !== "undefined" && window.flutter_inappwebview) {
  //     window.flutter_inappwebview.callHandler("goHome");
  //     console.log("Flutter에게 홈으로 가기 요청");
  //   } else {
  //     console.log("Flutter Webview상태가 아닙니다.");
  //   }
  // };

  const goBack = () => {
    if (typeof window !== "undefined" && window.flutter_inappwebview && currentStep === 1) {
      window.flutter_inappwebview.callHandler("goBackOnboarding"); // flutter에 goBackOnboarding 요청
      console.log("Flutter에게 뒤로가기 요청");
    } else {
      console.log("Flutter Webview상태가 아닙니다.");
    }
    if (currentStep !== 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className={`w-full h-16 flex justify-between px-body-s`}>
      {/* 이전 버튼 */}
      <div className=" flex justify-center items-center ">
        <div aria-label="back" onClick={goBack}>
          <ArrowBack />
        </div>
      </div>
      {/* 건너뛰기 버튼 */}
      <div className=" flex justify-center items-center"></div>
    </div>
  );
}
