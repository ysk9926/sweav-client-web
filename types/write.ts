// /types/exercise.ts

import React from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

//
// 👉 기본 데이터 타입
//

// 날짜 정보 (운동 기록용)
export interface WriteDate {
  month: number;
  day: number;
}

// 운동 선택 버튼 Props
export interface ExerciseChoiceBtnProps {
  icon: React.ReactNode;
  label: string;
  linkTo: string;
}

// 운동 기록 시간 props
export interface IWriteCardioForm {
  register: UseFormRegister<{ time: string }>;
}

export interface IWriteCardioBtn {
  btnState: boolean;
  exercise: IExerciseItem;
  time: string;
}

//
export interface DefaultModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

// 운동 추가 모달 Props
export interface AddExerciseProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

// 운동 수정 모달 props
export interface EditExerciseProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  exercise: IExerciseItem;
}

// 운동 삭제 모달 props
export interface DeleteCardioProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  exercise: IExerciseItem;
}

// 운동 삭제 버튼 props
export interface DeleteCardioButton {
  exercise: IExerciseItem;
}

// 운동 추가 인풋 폼
export interface AddExerciseInput {
  title: string;
}

// 검색 인풋 상태 (useForm 기반)
export interface ExerciseSearchInputForm {
  searchItem: string;
}

// 검색 상태 관리 (Zustand 등에서 사용될 수 있음)
export interface ExerciseSearchData {
  searchData: string;
}

// 검색 버튼 컴포넌트 Props
export interface SearchBtnProps {
  searchInputData: string;
  setValue: UseFormSetValue<ExerciseSearchInputForm>;
}

// 검색 인풋 컴포넌트 Props
export interface SearchInputProps {
  setValue: UseFormSetValue<ExerciseSearchInputForm>;
  register: UseFormRegister<ExerciseSearchInputForm>;
  searchInputData: string;
}

// 선택 버튼 컴포넌트 Props
export interface SelectBtnProps {
  selectedV: IExerciseItem;
  isShort: boolean;
  params: {
    date: string;
  };
}

export interface IExerciseSearchReq {
  keyword?: string;
  nextToken?: number | null;
  size?: number;
  type: ExerciseType;
  part?: ExercisePart;
}

export interface IExerciseItem {
  id: number;
  name: string;
  type: string;
  isUserCreated: boolean;
  createdAt: string;
  modifiedAt: string;
  parts: IExercisepart[];
}

export interface IExerciseSearchRes {
  content: IExerciseItem[];
  hasNext: boolean;
  nextToken: number | null;
}

export interface ICreateExerciseReq {
  name: string;
  type: ExerciseType;
  parts?: ExercisePart[];
}

export interface ICreateExerciseRes {
  id: number;
  name: string;
  type: ExerciseType;
  parts: ExercisePart[] | null;
  mets: number;
  isUserCreated: boolean;
  createdAt: string;
  modifiedAt: string;
}

export interface IExercisepart {
  code: ExercisePart;
  name: string;
}

//
// ✅ enum 대신 타입 (제한된 값만 허용할 때 사용)
//    type을 사용한 이유: union 타입이 더 간결하고 enum보다 직관적
//

// 운동 종류 필터 (CARDIO_EXERCISE or WEIGHT_TRAINING)
export type ExerciseType = "CARDIO_EXERCISE" | "WEIGHT_TRAINING"; // enum보다 union이 직관적이라 type 사용

// 운동 부위 필터
export type ExercisePart =
  | "ALL"
  | "CHEST"
  | "BACK"
  | "SHOULDER"
  | "ARM"
  | "LOWER_BODY"
  | "ABS"
  | "FULL_BODY"
  | "BODY_WEIGHT";

export enum ExerciseTypeEnum {
  WEIGHT_TRAINING = "WEIGHT_TRAINING",
  CARDIO_EXERCISE = "CARDIO_EXERCISE",
}

export const WeightPartMap: Record<string, string> = {
  가슴: "CHEST",
  등: "BACK",
  어깨: "SHOULDER",
  팔: "ARM",
  하체: "LOWER_BODY",
  복근: "ABS",
  전신: "FULL_BODY",
  맨몸: "BODY_WEIGHT",
};

export const AddWeightPartMap: Record<string, string> = {
  전체: "ALL",
  가슴: "CHEST",
  등: "BACK",
  어깨: "SHOULDER",
  팔: "ARM",
  하체: "LOWER_BODY",
  복근: "ABS",
  전신: "FULL_BODY",
  맨몸: "BODY_WEIGHT",
};

//
// 🧪 모킹 데이터
//

// 선택되지 않은 운동 초기값
export const unSelectedExercise: IExerciseItem = {
  id: -1,
  name: "undefined",
  type: "CARDIO_EXERCISE",
  isUserCreated: false,
  createdAt: "undefined",
  modifiedAt: "undefined",
  parts: [],
};
