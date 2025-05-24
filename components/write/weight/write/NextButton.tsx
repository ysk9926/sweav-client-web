"use client";

import { useRouter } from "next/navigation";

interface NextButtonProps {
  isDisabled: boolean;
  date: string;
}

export default function NextButton({ isDisabled, date }: NextButtonProps) {
  const router = useRouter();

  const handleNext = () => {
    if (!isDisabled) {
      router.push(`/write/${date}/weight/time`);
    }
  };

  return (
    <div className="sticky bottom-0 w-full p-6 bg-fill-neutral-white border-t border-line-neutral-secondary">
      <button
        onClick={handleNext}
        disabled={isDisabled}
        className={`w-full h-14 rounded-2xl font-semibold text-button-l
          ${
            !isDisabled
              ? "bg-button-fill-brand-default text-button-text-neutral-white"
              : "bg-button-fill-disabled-primary text-button-text-disabled-primary"
          }
        `}
      >
        다음
      </button>
    </div>
  );
}
