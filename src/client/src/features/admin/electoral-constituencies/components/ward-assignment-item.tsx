import { Checkbox } from "@/components/ui/checkbox.tsx";
import { useConstituencyStore } from "@/stores/useConstituencyStore.ts";
import type {
  WardIdNumber,
  WardWithConstituency,
} from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import type { MunicipalityInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";

export interface WardItemProps {
  municipality: MunicipalityInfo;
  wardWithConstituency: WardWithConstituency;
  onReassign?: (wardId: number) => void; // optional callback
}

export const WardAssignmentItem = ({
  municipality,
  wardWithConstituency,
  onReassign,
}: WardItemProps) => {
  const wardId = wardWithConstituency.wardId;

  const selectedConstituency = useConstituencyStore(
    (store) => store.selectedConstituency,
  );
  const setConstituency = useConstituencyStore(
    (store) => store.setConstituency,
  );

  const isAssignedToOther = Boolean(
    wardWithConstituency.assignedConstituencyId &&
    wardWithConstituency.assignedConstituencyId !==
      selectedConstituency?.constituencyId,
  );

  const onCheckboxClick = (): void => {
    if (!selectedConstituency) return;

    // Deep copy the municipalityWardInfos
    let updatedMunicipalities = [...selectedConstituency.municipalityWardInfos];

    // Find if this municipality already exists
    const municipalityIndex = updatedMunicipalities.findIndex(
      (m) => m.municipalityId === municipality.municipalityId,
    );

    if (municipalityIndex !== -1) {
      // Municipality exists
      const municipalityObj = updatedMunicipalities[municipalityIndex];
      const wardExists = municipalityObj.wardIdNumbers.some(
        (w) => w.wardId === wardId,
      );

      let updatedWards: WardIdNumber[];
      if (wardExists) {
        // Remove the ward
        updatedWards = municipalityObj.wardIdNumbers.filter(
          (w) => w.wardId !== wardId,
        );
      } else {
        // Add the ward
        updatedWards = [
          ...municipalityObj.wardIdNumbers,
          { wardId, wardNumber: wardWithConstituency.wardNumber },
        ];
      }

      // If no wards left, remove the municipality
      if (updatedWards.length === 0) {
        updatedMunicipalities.splice(municipalityIndex, 1);
      } else {
        updatedMunicipalities[municipalityIndex] = {
          ...municipalityObj,
          wardIdNumbers: updatedWards,
        };
      }
    } else {
      // Municipality does not exist yet → add it with this ward
      updatedMunicipalities.push({
        municipalityId: municipality.municipalityId,
        municipalityName: municipality.municipalityName,
        wardIdNumbers: [
          { wardId, wardNumber: wardWithConstituency.wardNumber },
        ],
      });
    }

    // Update the selected constituency in the store
    setConstituency({
      ...selectedConstituency,
      municipalityWardInfos: updatedMunicipalities,
    });
  };

  const isSelected = selectedConstituency?.municipalityWardInfos.some((m) =>
    m.wardIdNumbers.some((w) => w.wardId === wardId),
  );

  return (
    <div
      className={`flex items-center justify-between gap-3 px-3 py-2 rounded-md
        transition-colors
        ${isAssignedToOther ? "bg-muted/40 cursor-not-allowed" : "hover:bg-muted cursor-pointer"}
      `}
    >
      {/* Left side */}
      <div className="flex items-center gap-3">
        <Checkbox
          checked={isSelected || false}
          disabled={isAssignedToOther}
          onCheckedChange={onCheckboxClick}
          onClick={(e) => e.stopPropagation()}
        />

        <span
          className={`text-sm font-medium ${
            isAssignedToOther
              ? "text-muted-foreground"
              : isSelected
                ? "text-foreground"
                : "text-muted-foreground"
          }`}
        >
          Ward Number : {wardWithConstituency.wardNumber}
          {isAssignedToOther && (
            <span className="ml-2 text-xs italic text-muted-foreground">
              (Already assigned to{" "}
              {wardWithConstituency.assignedConstituencyName})
            </span>
          )}
        </span>
      </div>

      {/* Right side */}
      {isAssignedToOther && (
        <button
          type="button"
          onClick={() => onReassign?.(wardWithConstituency.wardId)}
          className="text-xs font-medium text-primary hover:underline"
        >
          Reassign
        </button>
      )}
    </div>
  );
};
