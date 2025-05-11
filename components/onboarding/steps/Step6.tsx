// import { useForm } from "react-hook-form";
// import { OnboardingProps, Step5Form } from "./interface";
// import MifflinText from "./mifflin/MifflinText";
// import { useEffect } from "react";

// export default function Step6({ onBoardingData, setOnboardingData, currentStep, setCurrentStep }: OnboardingProps) {
//   const { watch, register, setValue } = useForm<Step5Form>();
//   const heightV = watch("height");
//   const weightV = watch("weight");

//   useEffect(() => {
//     if (onBoardingData.height !== 0) {
//       setValue("height", onBoardingData.height);
//     }
//     if (onBoardingData.weight !== 0) {
//       setValue("weight", onBoardingData.weight);
//     }
//   }, [currentStep]);

//   const clickHandler = () => {
//     if ((!heightV || Number(heightV) === 0) && (!weightV || Number(weightV) === 0)) return null;

//     setOnboardingData((prev) => ({
//       ...prev,
//       height: Number(heightV),
//       weight: Number(weightV),
//     }));

//     setCurrentStep(currentStep + 1);
//   };

//   return (
//     <div className=" w-full h-full p-12 flex flex-col justify-between">
//       {/* header */}
//       <div className=" space-y-4">
//         {/* header */}
//         <span className="text-heading-m text-text-neutral-default font-semibold">키와 몸무게를 알려주세요.</span>
//         {/* mifflin */}
//         <MifflinText />
//       </div>
//       {/* input */}
//       <div className="flex flex-col justify-center items-center space-y-[1.33333rem]">
//         {/* height */}
//         <div className="flex justify-center items-center space-x-4">
//           {/* age input */}
//           <input
//             {...register("height")}
//             type="number"
//             className="bg-fill-neutral-default placeholder:text-text-neutral-tertiary w-[10rem] h-[4.666667rem] rounded-2xl font-outfit text-center font-semibold text-button-m focus:outline-2 outline-line-brand-default"
//             placeholder="키"
//           />
//           {/* text */}
//           <span className="text-text-neutral-default text-heading-s font-semibold">cm</span>
//         </div>
//         {/* weight */}
//         <div className="flex justify-center items-center space-x-4">
//           {/* age input */}
//           <input
//             {...register("weight")}
//             type="number"
//             className="bg-fill-neutral-default placeholder:text-text-neutral-tertiary w-[10rem] h-[4.666667rem] rounded-2xl font-outfit text-center font-semibold text-button-m focus:outline-2 outline-line-brand-default"
//             placeholder="몸무게"
//           />
//           {/* text */}
//           <span className="text-text-neutral-default text-heading-s font-semibold">kg</span>
//         </div>
//       </div>
//       {/* next - btn */}
//       {heightV && Number(heightV) && weightV && Number(weightV) !== 0 ? (
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
