import { Button } from "@/components/ui/button.tsx";
import { Pencil, Trash2 } from "lucide-react";

export interface EditDeleteActionProps {
  onEditClick: () => void;
  onDeleteClick: () => void;
}
export const EditDeleteAction = ({
  onEditClick,
  onDeleteClick,
}: EditDeleteActionProps) => {
  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={onEditClick}
      >
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 text-destructive"
        onClick={onDeleteClick}
      >
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
};
