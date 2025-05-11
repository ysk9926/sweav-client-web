"use client";

import { useSelectedCardioDataStore } from "@/stores/selectedCardioDataStore";
import { DefaultModalProps } from "@/types/write";
import { Modal, ModalContent } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function RecordBackModal({ isOpen, onOpenChange }: DefaultModalProps) {
  const { resetData } = useSelectedCardioDataStore();
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler("backToFlutter");
      console.log("Flutter에게 뒤로가기 요청");
    } else {
      console.log("Flutter Webview상태가 아닙니다.");
    }
  };

  const handleCancle = () => {
    resetData();
    goBack();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton placement="center" className="w-full mx-6">
      <ModalContent>
        {(onClose) => (
          <div className="w-full flex justify-center items-center flex-col space-y-6 p-6">
            <span className="font-semibold text-heading-m text-text-neutral-default">기록을 취소하시겠어요?</span>
            <div className="flex flex-col justify-center items-center text-heading-xs">
              <span className="text-text-neutral-tertiary text-body-s">
                입력한 내용을 저장하지 않고 처음으로 돌아갑니다.
              </span>
            </div>
            <div className="flex justify-between items-center w-full space-x-3">
              <div
                onClick={onClose}
                className="border-2 border-line-brand-default h-14 flex justify-center items-center w-full rounded-2xl text-button-text-brand-default font-semibold text-button-l"
              >
                <span>계속하기</span>
              </div>
              <div
                onClick={handleCancle}
                className=" h-14 flex justify-center items-center w-full rounded-2xl bg-button-fill-brand-default text-button-text-neutral-white"
              >
                <span>취소하기</span>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
