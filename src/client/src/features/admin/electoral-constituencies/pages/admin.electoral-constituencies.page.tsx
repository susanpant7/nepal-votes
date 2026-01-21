import { GeographicLocationContainer } from "@/features/admin/electoral-constituencies/components/geographic-location-container.tsx";
import { ConstituencySelectionContainer } from "@/features/admin/electoral-constituencies/components/constituency-selection-container.tsx";

export const AdminElectoralConstituenciesPage = () => {
  return (
    <div className="w-full gap-4 flex">
      {/* Geography */}
      <div className="flex-5 border rounded-lg ">
        <GeographicLocationContainer />
      </div>

      {/* Constituency */}
      <div className="flex-5 border rounded-lg">
        <ConstituencySelectionContainer />
      </div>
    </div>
  );
};
