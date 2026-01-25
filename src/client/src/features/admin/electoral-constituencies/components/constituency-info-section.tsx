import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useConstituencyStore } from "@/stores/useConstituencyStore.ts";
import { Button } from "@/components/ui/button";
import type {
  AddConstituencyRequest,
  EditConstituencyRequest,
} from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { useAdminConstituencyMutation } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.query.ts";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";

export const ConstituencyInfoSection = () => {
  const navigate = useNavigate();

  const constituencyDetail = useConstituencyStore(
    (s) => s.selectedConstituency,
  );

  const setConstituency = useConstituencyStore((s) => s.setConstituency);

  const { addConstituency, updateConstituency } =
    useAdminConstituencyMutation();

  const onConstituencyNameChange = (value: string) => {
    if (!constituencyDetail) return;
    setConstituency({ ...constituencyDetail, constituencyName: value });
  };

  const constituencyName = constituencyDetail?.constituencyName;
  const selectedWardIds = constituencyDetail?.municipalityWardInfos.flatMap(
    (m) => m.wardIdNumbers.map((w) => w.wardId),
  );
  const disableSave =
    !constituencyName || !selectedWardIds || selectedWardIds?.length === 0;

  const onSaveButtonClick = async () => {
    const addRequest: AddConstituencyRequest = {
      constituencyName: constituencyDetail?.constituencyName!,
      wardIds: selectedWardIds!,
    };
    let constId = constituencyDetail?.constituencyId;
    if (constituencyDetail?.constituencyId) {
      const updateRequest: EditConstituencyRequest = {
        ...addRequest,
        constituencyId: constituencyDetail.constituencyId,
      };

      await updateConstituency.mutateAsync(updateRequest);
    } else {
      constId = await addConstituency.mutateAsync(addRequest);
    }
    await navigate({
      to: ROUTES.ADMIN_ELECTORAL_CONSTITUENCIES_EDIT,
      params: { constituencyId: constId },
    });
  };

  return (
    <div className="col-span-2">
      <div className="rounded-xl border bg-card p-6 shadow-sm space-y-6">
        {/* Constituency Name */}
        <div className="space-y-2">
          <Label htmlFor="constituencyName">Constituency Name</Label>
          <Input
            id="constituencyName"
            type="text"
            placeholder="Enter constituency name"
            value={constituencyDetail?.constituencyName || ""}
            onChange={(e) => onConstituencyNameChange(e.target.value)}
          />
        </div>

        {/* Selected Wards */}
        <div className="space-y-2">
          <Label>Selected Wards</Label>

          <div className="rounded-lg border bg-muted/40 p-4">
            {!constituencyDetail ||
            constituencyDetail.municipalityWardInfos.length === 0 ? (
              <p className="text-sm text-muted-foreground italic">
                No wards selected. Select wards from the respective
                municipalities.
              </p>
            ) : (
              <div className="space-y-3">
                {constituencyDetail.municipalityWardInfos.map((m) => (
                  <div key={m.municipalityId} className="flex flex-col gap-1">
                    <span className="text-sm font-medium">
                      {m.municipalityName}
                    </span>
                    <span className="text-sm text-muted-foreground pl-2">
                      {m.wardIdNumbers
                        .sort((a, b) => a.wardNumber - b.wardNumber)
                        .map((w) => `Ward ${w.wardNumber}`)
                        .join(", ")}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-4">
          <Button size="lg" onClick={onSaveButtonClick} disabled={disableSave}>
            {constituencyDetail?.constituencyId
              ? "Update Constituency"
              : "Save Constituency"}
          </Button>
        </div>
      </div>
    </div>
  );
};
