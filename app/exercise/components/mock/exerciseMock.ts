import { ExerciseItemWithSetInfo } from "@/components/write/weight/write/types";
import { ExerciseType, ExerciseTypeEnum } from "@/types/write";
import ExerciseAccordion from "../ExerciseAccordion";

export interface ExerciseGroup {
  groupName: string;
  groupType: ExerciseType;
  totalMinutes: number;
  calorie: number;
  exerciseList: ExerciseItemWithSetInfo[];
}

export const exerciseGroupMock: ExerciseGroup[] = [
  {
    groupName: "등, 가슴",
    groupType: ExerciseTypeEnum.WEIGHT_TRAINING,
    totalMinutes: 15,
    calorie: 300,
    exerciseList: [
      {
        itemId: "1",
        exerciseName: "원 암 덤벨 로우",
        setList: [
          { setId: "1", weight: 20, reps: 10 },
          { setId: "2", weight: 20, reps: 10 },
          { setId: "3", weight: 20, reps: 10 },
        ],
      },
      {
        itemId: "2",
        exerciseName: "렛 풀 다운",
        setList: [
          { setId: "1", weight: 60, reps: 10 },
          { setId: "2", weight: 60, reps: 10 },
          { setId: "3", weight: 60, reps: 10 },
        ],
      },
      {
        itemId: "3",
        exerciseName: "해머 스트렝스 슈퍼 인클라인",
        setList: [
          { setId: "1", weight: 60, reps: 10 },
          { setId: "2", weight: 60, reps: 10 },
          { setId: "3", weight: 60, reps: 10 },
        ],
      },
    ],
  },
  {
    groupName: "하체, 어깨",
    groupType: ExerciseTypeEnum.WEIGHT_TRAINING,
    totalMinutes: 20,
    calorie: 350,
    exerciseList: [
      {
        itemId: "4",
        exerciseName: "스쿼트",
        setList: [
          { setId: "1", weight: 100, reps: 10 },
          { setId: "2", weight: 100, reps: 8 },
          { setId: "3", weight: 100, reps: 6 },
        ],
      },
      {
        itemId: "5",
        exerciseName: "레그 프레스",
        setList: [
          { setId: "1", weight: 180, reps: 12 },
          { setId: "2", weight: 180, reps: 10 },
        ],
      },
      {
        itemId: "6",
        exerciseName: "숄더 프레스",
        setList: [
          { setId: "1", weight: 40, reps: 10 },
          { setId: "2", weight: 40, reps: 8 },
        ],
      },
    ],
  },
  {
    groupName: "족구",
    groupType: ExerciseTypeEnum.CARDIO_EXERCISE,
    totalMinutes: 20,
    calorie: 350,
    exerciseList: [],
  },
];
