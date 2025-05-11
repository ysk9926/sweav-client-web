import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
// import Step6 from "./Step6";
// import Step7 from "./Step7";

import { ISteps } from "./interface";

export const steps: ISteps[] = [
  { id: 1, title: "성별", component: Step3 },
  { id: 2, title: "나이", component: Step4 },
  { id: 3, title: "활동량", component: Step5 },
  // { id: 4, title: "키 몸무게", component: Step6 },
  // { id: 5, title: "목표", component: Step7 },
];
