import React from "react";

interface NextButtonProps {
  onClick?: () => void;
  isDisabled?: boolean;
}

export default function NextButton({ onClick, isDisabled }: NextButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center relative h-32">
      <div className=" absolute -top-5 h-5 w-full bg-gradient-to-b from-fill-neutral-secondary/0 to-fill-neutral-secondary/100"></div>
      <button
        className={`${
          isDisabled
            ? "bg-button-fill-disabled-primary"
            : "bg-button-fill-brand-default"
        } w-[310px] h-14 px-4 rounded-2xl font-semibold text-button-l text-button-text-neutral-white`}
        onClick={onClick}
        type="button"
        disabled={isDisabled}
      >
        다음
      </button>
    </div>
  );
}
