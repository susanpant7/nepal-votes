import { GeographicLocationContainer } from "@/features/admin/electoral-constituencies/components/GeographicLocationContainer.tsx";
import { ConstituencySelectionContainer } from "@/features/admin/electoral-constituencies/components/ConstituencySelectionContainer.tsx";

export const AdminElectoralConstituenciesPage = () => {
  return (
    <div className="w-full gap-4 flex">
      {/* Geography */}
      <div className="flex-6 border rounded-lg ">
        <GeographicLocationContainer />
      </div>

      {/* Constituency */}
      <div className="flex-4 border rounded-lg">
        <ConstituencySelectionContainer />
      </div>
    </div>
  );
};
