import MoveHandle from "@/shared/icons/MoveHandle";
import DeleteBtn from "@/shared/icons/DeleteBtn";

interface ReorderSimpleCardProps {
  exerciseName: string;
  isDragging?: boolean;
  onMoveHandlePointerDown?: () => void;
  onMoveHandlePointerUp?: () => void;
  onCancelReorderMode?: () => void;
  provided?: any;
  style?: React.CSSProperties;
}

export default function ReorderSimpleCard({
  exerciseName,
  isDragging,
  onMoveHandlePointerUp,
  onCancelReorderMode,
  provided,
  style,
}: ReorderSimpleCardProps) {
  return (
    <div
      ref={provided?.innerRef}
      {...(provided ? provided.draggableProps : {})}
      {...(provided ? provided.dragHandleProps : {})}
      style={style}
      className={
        "bg-fill-neutral-white h-20 rounded-xl shadow-sm border p-4 border-line-neutral-secondary transition max-w-md mx-auto flex flex-col justify-between items-center" +
        (isDragging ? " shadow-2xl" : "")
      }
    >
      <div className="flex justify-between items-center w-full">
        <div
          className="mr-3 cursor-pointer"
          onPointerUp={onMoveHandlePointerUp}
          onPointerLeave={onMoveHandlePointerUp}
        >
          <MoveHandle />
        </div>
        <div
          className="ml-3 cursor-pointer"
          onPointerDown={onCancelReorderMode}
        >
          <DeleteBtn />
        </div>
      </div>
      <div className="flex justify-start items-center w-full">
        <span className="font-semibold text-button-l flex-1">
          {exerciseName}
        </span>
      </div>
    </div>
  );
}
