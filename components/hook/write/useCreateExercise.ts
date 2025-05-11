import { exerciseApis } from "@/api/write/exerciseApi";
import { ICreateExerciseReq, ICreateExerciseRes } from "@/types/write";
import { useMutation, UseQueryResult } from "@tanstack/react-query";

export const useCreateExercise = () => {
  return useMutation({
    mutationFn: (params: ICreateExerciseReq) => exerciseApis.createExercise(params).then((res) => res.data),
  });
};
