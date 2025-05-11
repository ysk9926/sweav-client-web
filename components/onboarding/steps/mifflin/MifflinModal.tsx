"use client";

import { Modal, ModalContent } from "@heroui/react";
import { MifflinModalProps } from "../interface";

export default function MifflinModal({ isOpen, onOpenChange }: MifflinModalProps) {
  return (
    <Modal isOpen={isOpen} placement="bottom" onOpenChange={onOpenChange} hideCloseButton size="xl">
      <ModalContent className="w-dvw h-4/6 rounded-b-none pt-4  px-body-s m-0 ">
        {(onClose) => (
          <div className={`flex flex-col justify-between items-center h-full space-y-4 pb-4`}>
            <div className=" h-full min-h-0">
              {/* header */}
              <div className=" flex justify-center items-center text-heading-s font-semibold ">
                <span>Mifflin-St Jeor 공식이 뭔가요?</span>
              </div>
              {/* content */}
              <div className="mt-1 text-body-s text-text-neutral-default space-y-4 px-6 overflow-auto h-full min-h-0">
                {/* Mifflin-St Jeor 공식 설명 추가 */}
                <div className="border-y border-gray-300 py-4 my-4">
                  <span className="text-xl font-semibold">💡 Mifflin-St Jeor 공식이란?</span>
                  <div className="mt-2">
                    <span>이 공식은 기초대사량(BMR)을 계산하는 공식이에요!</span>
                    <br />
                    <span>
                      즉, <strong>하루 종일 가만히 있어도 우리 몸이 쓰는 최소한의 칼로리</strong>를 알려주는 거죠.
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="font-semibold text-xl">💬 왜 중요할까?</span>
                    <br />
                    <span>
                      1990년에 만들어진 공식으로, 예전보다 더 <strong>정확하게 BMR을 계산</strong>할 수 있어요.
                    </span>
                    <br />
                    <span>**키·체중·나이·성별**을 입력하면 내 BMR이 나와요.</span>
                    <br />
                    <span>
                      이후 <strong>활동량을 곱하면 하루 총 소비 칼로리(TDEE)</strong>도 알 수 있어요.
                    </span>
                  </div>
                  <div className="mt-3">
                    <span className="font-semibold text-xl">🚗 몸도 자동차처럼 연비가 있어요!</span>
                    <br />
                    <span>
                      내 몸이 기본적으로 <strong>하루에 얼마나 연료(칼로리)를 쓰는지</strong> 알려주는 공식이에요.
                    </span>
                    <br />
                    <span>
                      거기에 <strong>운동이나 활동량을 추가하면 하루에 필요한 총 칼로리</strong>가 나오게 됩니다. 🙂
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* btn */}
            <div className="w-full pt-2 bg-white">
              <div
                onClick={onClose}
                className=" text-2xl text-white bg-button-fill-brand-default w-full flex justify-center items-center h-14 rounded-2xl"
              >
                <span>확인</span>
              </div>
            </div>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
}
