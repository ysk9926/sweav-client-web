import { AxiosResponse } from "axios";
import { privateApi } from "../instance"; // 인증 필요하므로 private 사용
import { ICreateExerciseReq, ICreateExerciseRes, IExerciseSearchReq, IExerciseSearchRes } from "@/types/write";

export const exerciseApis = {
  // 운동 검색
  searchExercises: (params: IExerciseSearchReq): Promise<AxiosResponse<IExerciseSearchRes>> => {
    return privateApi.get<IExerciseSearchRes>(`/v1/exercises/search`, {
      params,
    });
  },
  // 운동 추가
  createExercise: (params: ICreateExerciseReq): Promise<AxiosResponse<ICreateExerciseRes>> => {
    return privateApi.post<ICreateExerciseRes>(`/v1/exercises`, params);
  },
  // 운동 종목 삭제
  deleteExercise: (exerciseId: number): Promise<AxiosResponse<void>> => {
    return privateApi.delete(`/v1/exercises/${exerciseId}`);
  },
};
