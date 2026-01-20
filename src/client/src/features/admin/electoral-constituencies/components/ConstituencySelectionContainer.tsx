import { useConstituencyStore } from "@/stores/useConstituencyStore.ts";
import { Button } from "@/components/ui/button.tsx";

export const ConstituencySelectionContainer = () => {
  const { selectedWardIds, clearWards } = useConstituencyStore();
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-foreground">
        Selected Wards ({selectedWardIds.length})
      </h3>

      {selectedWardIds.length === 0 && (
        <p className="text-muted-foreground text-sm">
          Select wards from the geography panel
        </p>
      )}

      <ul className="space-y-1">
        {selectedWardIds.map((id) => (
          <li key={id} className="text-sm">
            Ward ID: {id}
          </li>
        ))}
      </ul>

      <Button disabled={selectedWardIds.length === 0} onClick={clearWards}>
        Clear Selection
      </Button>
    </div>
  );
};
