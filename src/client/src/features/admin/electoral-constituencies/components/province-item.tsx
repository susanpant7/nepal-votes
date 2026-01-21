import type { ProvinceInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { useState } from "react";
import { ExpandCollapseIcon } from "@/components/expand-collapse-icon/expand-collapse-icon.tsx";
import { DistrictsList } from "@/features/admin/electoral-constituencies/components/districts-list.tsx";

export interface ProvinceItemProps {
  province: ProvinceInfo;
}
export const ProvinceItem = (props: ProvinceItemProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <ExpandCollapseIcon
        isExpanded={expanded}
        onClick={() => setExpanded(!expanded)}
      />
      <span className="text-foreground font-medium">
        {props.province.provinceName}
        {expanded && (
          <div className="pl-8 pt-2 pb-2">
            <p className="text-muted-foreground text-sm">
              <DistrictsList province={props.province} />
            </p>
          </div>
        )}
      </span>
    </div>
  );
};
