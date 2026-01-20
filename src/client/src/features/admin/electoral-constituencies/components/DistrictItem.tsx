import { useState } from "react";
import type { DistrictInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { ExpandCollapseIcon } from "@/components/expand-collapse-icon/expand-collapse-icon.tsx";
import { MunicipalitiesList } from "@/features/admin/electoral-constituencies/components/MunicipalitiesList.tsx";
export interface DistrictItemProps {
  district: DistrictInfo;
}
export const DistrictItem = (props: DistrictItemProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <ExpandCollapseIcon
        isExpanded={expanded}
        onClick={() => setExpanded(!expanded)}
      />
      <span className="text-foreground font-medium">
        {props.district.districtName}
        {expanded && (
          <div className="pl-8 pt-2 pb-2">
            <p className="text-muted-foreground text-sm">
              <MunicipalitiesList district={props.district} />
            </p>
          </div>
        )}
      </span>
    </div>
  );
};
