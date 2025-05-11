import { useMutation } from "@tanstack/react-query";
import { exerciseApis } from "@/api/write/exerciseApi";

export const useDeleteExercise = () => {
  return useMutation({
    mutationFn: (exerciseId: number) => exerciseApis.deleteExercise(exerciseId),
    onSuccess: () => {
      console.log("운동이 성공적으로 삭제되었습니다.");
      window.location.reload();
    },
    onError: (error) => {
      console.error("운동 삭제 실패:", error);
      alert("운동을 삭제하지 못했습니다. 다시 시도해주세요.");
    },
  });
};
