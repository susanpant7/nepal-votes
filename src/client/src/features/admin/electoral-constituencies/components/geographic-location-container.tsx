import { ProvincesList } from "@/features/admin/electoral-constituencies/components/provinces-list.tsx";

export const GeographicLocationContainer = () => {
  return (
    <div className="flex flex-col w-full h-150">
      <div className="px-4 py-3 border-b border-border font-semibold">
        Geographic Locations
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-2 scroll-theme-color">
        <ProvincesList />
      </div>
    </div>
  );
};
