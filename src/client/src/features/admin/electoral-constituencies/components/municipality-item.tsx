import { useState } from "react";
import type { MunicipalityInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { ExpandCollapseIcon } from "@/components/expand-collapse-icon/expand-collapse-icon.tsx";
import { WardAssignments } from "@/features/admin/electoral-constituencies/components/ward-Assignments.tsx";
export interface MunicipalityItemProps {
  municipality: MunicipalityInfo;
}
export const MunicipalityItem = (props: MunicipalityItemProps) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <ExpandCollapseIcon
        isExpanded={expanded}
        onClick={() => setExpanded(!expanded)}
      />
      <span className="text-foreground font-medium">
        {props.municipality.municipalityName}
        {expanded && (
          <div className="pl-8 pt-2 pb-2">
            <p className="text-muted-foreground text-sm">
              <WardAssignments municipality={props.municipality} />
            </p>
          </div>
        )}
      </span>
    </div>
  );
};
