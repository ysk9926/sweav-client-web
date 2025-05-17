import { IExerciseSearchRes } from "@/types/write";

export const mockWeightTrainingResponse: IExerciseSearchRes = {
  content: [
    {
      id: 1,
      name: "스쿼트",
      type: "WEIGHT_TRAINING",
      isUserCreated: false,
      createdAt: "2024-03-20T00:00:00Z",
      modifiedAt: "2024-03-20T00:00:00Z",
      parts: [
        {
          code: "LOWER_BODY",
          name: "하체",
        },
      ],
    },
    {
      id: 2,
      name: "벤치프레스",
      type: "WEIGHT_TRAINING",
      isUserCreated: false,
      createdAt: "2024-03-20T00:00:00Z",
      modifiedAt: "2024-03-20T00:00:00Z",
      parts: [
        {
          code: "CHEST",
          name: "가슴",
        },
      ],
    },
    {
      id: 3,
      name: "데드리프트",
      type: "WEIGHT_TRAINING",
      isUserCreated: false,
      createdAt: "2024-03-20T00:00:00Z",
      modifiedAt: "2024-03-20T00:00:00Z",
      parts: [
        {
          code: "BACK",
          name: "등",
        },
        {
          code: "CHEST",
          name: "가슴",
        },
      ],
    },
    {
      id: 4,
      name: "오버헤드 프레스",
      type: "WEIGHT_TRAINING",
      isUserCreated: false,
      createdAt: "2024-03-20T00:00:00Z",
      modifiedAt: "2024-03-20T00:00:00Z",
      parts: [
        {
          code: "SHOULDER",
          name: "어깨",
        },
        {
          code: "CHEST",
          name: "가슴",
        },
      ],
    },
    {
      id: 5,
      name: "바벨 컬",
      type: "WEIGHT_TRAINING",
      isUserCreated: false,
      createdAt: "2024-03-20T00:00:00Z",
      modifiedAt: "2024-03-20T00:00:00Z",
      parts: [
        {
          code: "ARM",
          name: "팔",
        },
      ],
    },
  ],
  hasNext: true,
  nextToken: 5,
};

export const mockCardioExerciseResponse: IExerciseSearchRes = {
  content: [
    {
      id: 1,
      name: "러닝",
      type: "CARDIO_EXERCISE",
      isUserCreated: false,
      createdAt: "2024-03-20T00:00:00Z",
      modifiedAt: "2024-03-20T00:00:00Z",
      parts: [],
    },
    {
      id: 2,
      name: "사이클링",
      type: "CARDIO_EXERCISE",
      isUserCreated: false,
      createdAt: "2024-03-20T00:00:00Z",
      modifiedAt: "2024-03-20T00:00:00Z",
      parts: [],
    },
    {
      id: 3,
      name: "수영",
      type: "CARDIO_EXERCISE",
      isUserCreated: false,
      createdAt: "2024-03-20T00:00:00Z",
      modifiedAt: "2024-03-20T00:00:00Z",
      parts: [],
    },
    {
      id: 4,
      name: "줄넘기",
      type: "CARDIO_EXERCISE",
      isUserCreated: false,
      createdAt: "2024-03-20T00:00:00Z",
      modifiedAt: "2024-03-20T00:00:00Z",
      parts: [],
    },
    {
      id: 5,
      name: "로잉",
      type: "CARDIO_EXERCISE",
      isUserCreated: false,
      createdAt: "2024-03-20T00:00:00Z",
      modifiedAt: "2024-03-20T00:00:00Z",
      parts: [],
    },
  ],
  hasNext: true,
  nextToken: 5,
};
