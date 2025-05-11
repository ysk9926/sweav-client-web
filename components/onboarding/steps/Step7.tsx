// import { useForm } from "react-hook-form";
// import { OnboardingProps, Step7Form } from "./interface";
// import { useEffect, useState } from "react";
// import MifflinText from "./mifflin/MifflinText";

// export default function Step7({ onBoardingData, setOnboardingData, currentStep, setCurrentStep }: OnboardingProps) {
//   const { watch, register, setValue } = useForm<Step7Form>();
//   const durationV = watch("goalDuration");
//   const weightV = watch("goalWeight");
//   const [warningMessage, setWarningMessage] = useState<string>("");

//   useEffect(() => {
//     if (!durationV || !weightV) {
//       setWarningMessage("");
//       return;
//     }

//     const duration = Number(durationV);
//     const weightChange = onBoardingData.weight - Number(weightV);
//     const rate = weightChange / duration; // 1개월당 감량/증량 속도

//     if (weightChange > 0 && rate > 2) {
//       setWarningMessage("안전한 다이어트를 위해 목표 기간을 늘리는 것을 추천합니다.");
//     } else if (weightChange < 0 && Math.abs(rate) > 1.5) {
//       setWarningMessage("건강한 증량을 위해 목표 기간을 늘리는 것을 추천합니다.");
//     } else {
//       setWarningMessage("");
//     }
//   }, [durationV, weightV]);

//   useEffect(() => {
//     if (onBoardingData.goalDuration !== 0) {
//       setValue("goalDuration", onBoardingData.goalDuration);
//     }
//     if (onBoardingData.goalWeight !== 0) {
//       setValue("goalWeight", onBoardingData.goalWeight);
//     }
//   }, [currentStep]);

//   const clickHandler = () => {
//     if ((!durationV || Number(durationV) === 0) && (!weightV || Number(weightV) === 0)) return null;

//     const updatedData = {
//       ...onBoardingData,
//       goalDuration: Number(durationV),
//       goalWeight: Number(weightV),
//     };

//     setOnboardingData(updatedData);

//     const jsonDataString = JSON.stringify(updatedData);

//     if (typeof window !== "undefined" && window.flutter_inappwebview) {
//       window.flutter_inappwebview.callHandler("receiveOnboardingData", jsonDataString);
//       console.log("📢 Flutter로 전송된 데이터 (JSON String):", jsonDataString);
//     } else {
//       console.log("⚠️ Flutter WebView 환경이 아닙니다.");
//     }
//   };
//   return (
//     <div className=" w-full h-full p-12 flex flex-col justify-between">
//       {/* header */}
//       <div className=" space-y-4">
//         {/* header */}
//         <span className="text-heading-m text-text-neutral-default font-semibold">목표를 정해볼까요?</span>
//         {/* mifflin */}
//         <MifflinText />
//       </div>
//       {/* input */}
//       <div className="flex flex-col justify-center items-center space-y-[1.33333rem]">
//         {/* height */}
//         <div className="flex justify-center items-center space-x-4">
//           {/* age input */}
//           <input
//             {...register("goalDuration")}
//             type="number"
//             className="bg-fill-neutral-default placeholder:text-text-neutral-tertiary w-[10rem] h-[4.666667rem] rounded-2xl font-outfit text-center font-semibold text-button-m focus:outline-2 outline-line-brand-default"
//             placeholder="목표 개월 수"
//           />
//           {/* text */}
//           <span className="text-text-neutral-default text-heading-s font-semibold w-14">개월</span>
//         </div>
//         {/* weight */}
//         <div className="flex justify-center items-center space-x-4">
//           {/* age input */}
//           <input
//             {...register("goalWeight")}
//             type="number"
//             className="bg-fill-neutral-default placeholder:text-text-neutral-tertiary w-[10rem] h-[4.666667rem] rounded-2xl font-outfit text-center font-semibold text-button-m focus:outline-2 outline-line-brand-default"
//             placeholder="목표 몸무게"
//           />
//           {/* text */}
//           <span className="text-text-neutral-default text-heading-s font-semibold w-14">kg</span>
//         </div>
//         {warningMessage ? (
//           <div className="text-[#F17E61] text-center text-body-s px-10 pt-4 h-20">{warningMessage}</div>
//         ) : (
//           <div className=" h-20"></div>
//         )}
//       </div>
//       {/* Warning message */}
//       {/* next - btn */}
//       {durationV && Number(durationV) && weightV && Number(weightV) !== 0 ? (
//         <div
//           onClick={clickHandler}
//           className="bg-button-fill-brand-default h-[4.66667rem] rounded-xl flex justify-center items-center"
//         >
//           <span className="text-button-text-neutral-white text-2xl">다음</span>
//         </div>
//       ) : (
//         <div className="h-[4.66667rem]"></div>
//       )}
//     </div>
//   );
// }
