import type { WardInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { Checkbox } from "@/components/ui/checkbox.tsx";
import { useConstituencyStore } from "@/stores/useConstituencyStore.ts";

export interface WardItemProps {
  ward: WardInfo;
}
export const WardItem = (props: WardItemProps) => {
  const { selectedWardIds, toggleWard } = useConstituencyStore();
  const isSelected = selectedWardIds.includes(props.ward.wardId);

  const onCheckboxClick = (): void => {
    toggleWard(props.ward.wardId);
  };

  return (
    <div
      className="flex items-center gap-3 px-3 py-2 rounded-md
                 hover:bg-muted transition-colors cursor-pointer"
    >
      <Checkbox
        checked={isSelected}
        onCheckedChange={onCheckboxClick}
        onClick={(e) => e.stopPropagation()}
      />

      <span
        className={`text-sm font-medium ${
          isSelected ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        {props.ward.wardName}
      </span>
    </div>
  );
};
