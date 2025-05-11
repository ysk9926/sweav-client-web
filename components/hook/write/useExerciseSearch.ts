import { exerciseApis } from "@/api/write/exerciseApi";
import { IExerciseSearchReq, IExerciseSearchRes } from "@/types/write";
import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";

export const useExerciseSearch = (params: IExerciseSearchReq): UseQueryResult<IExerciseSearchRes> => {
  return useQuery({
    queryKey: ["exerciseSearch", params],
    queryFn: () => exerciseApis.searchExercises(params).then((res) => res.data),
    enabled: !!params.type, // type은 필수 조건
  });
};

export const useExerciseSearchInfinite = (
  params: Omit<IExerciseSearchReq, "nextToken">
): UseInfiniteQueryResult<InfiniteData<IExerciseSearchRes>, Error> => {
  return useInfiniteQuery<
    IExerciseSearchRes,
    Error,
    InfiniteData<IExerciseSearchRes>,
    [string, Omit<IExerciseSearchReq, "nextToken">],
    number | null
  >({
    queryKey: ["exerciseInfinite", params],
    queryFn: ({ pageParam = null }) =>
      exerciseApis.searchExercises({ ...params, nextToken: pageParam }).then((res) => res.data),
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextToken : undefined),
    initialPageParam: null,
  });
};
