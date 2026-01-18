import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

export interface ExpandCollapseIconProps {
  onClick?: () => void;
  isExpanded: boolean;
}
export const ExpandCollapseIcon = (props: ExpandCollapseIconProps) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8"
      onClick={props.onClick}
    >
      {props.isExpanded ? (
        <ChevronDown className="h-4 w-4 text-primary" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </Button>
  );
};
