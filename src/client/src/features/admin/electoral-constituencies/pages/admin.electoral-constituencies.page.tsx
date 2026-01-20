import { GeographicLocationContainer } from "@/features/admin/electoral-constituencies/components/GeographicLocationContainer.tsx";
import { ConstituencySelectionContainer } from "@/features/admin/electoral-constituencies/components/ConstituencySelectionContainer.tsx";

export const AdminElectoralConstituenciesPage = () => {
  return (
    <div className="flex w-full gap-4 overflow-hidden min-h-0">
      {/* Geography */}
      <div className="flex-7 flex flex-col min-h-0 border rounded-lg ">
        <GeographicLocationContainer />
      </div>

      {/* Constituency */}
      <div className="flex-3 border rounded-lg">
        <ConstituencySelectionContainer />
      </div>
    </div>
  );
};
