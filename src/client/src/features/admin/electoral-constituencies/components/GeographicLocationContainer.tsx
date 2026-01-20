import { ProvincesList } from "@/features/admin/electoral-constituencies/components/ProvincesList.tsx";

export const GeographicLocationContainer = () => {
  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="shrink-0 px-4 py-3 border-b border-border font-semibold">
        Geographic Locations
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-2">
        <ProvincesList />
      </div>
    </div>
  );
};
