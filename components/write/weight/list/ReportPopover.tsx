import { useEffect } from "react";

interface ReportPopoverProps {
  open: boolean;
  onClose: () => void;
  onReportClick: () => void;
  anchorRef: React.RefObject<HTMLDivElement>;
}

export default function ReportPopover({
  open,
  onClose,
  onReportClick,
  anchorRef,
}: ReportPopoverProps) {
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (anchorRef.current && !anchorRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose, anchorRef]);

  if (!open) return null;
  return (
    <div
      className="absolute right-0 top-3 z-50 bg-white border border-gray-200 rounded-2xl shadow-md w-28 p-2 flex flex-col"
      style={{ minWidth: 100 }}
    >
      <button
        className="text-red-400 text-body-m py-1 rounded"
        onClick={() => {
          onReportClick();
          onClose();
        }}
      >
        신고하기
      </button>
    </div>
  );
}
