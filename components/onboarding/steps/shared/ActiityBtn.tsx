import { ActivityButtonProps } from "../interface";

export default function ActivityButton({ label, isActive, onClick }: ActivityButtonProps) {
  return (
    <div
      onClick={onClick}
      className={`
          ${
            isActive
              ? "bg-button-fill-brand-secondary border-2 border-button-line-brand-default text-text-brand-default"
              : "bg-fill-neutral-secondary text-text-neutral-secondary"
          }
          w-full flex justify-center items-center h-14 rounded-2xl text-button-m cursor-pointer
        `}
    >
      <span>{label}</span>
    </div>
  );
}
