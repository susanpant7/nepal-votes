import { useState } from "react";
import { ConstituencySelect } from "@/features/admin/electoral-constituencies/components/constituency-select.tsx";
import type { ConstituencyInfo } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { AddEditConstituency } from "@/features/admin/electoral-constituencies/components/add-edit-constituency.tsx";

export const ConstituencySelectionContainer = () => {
  //const changeConstituency = useConstituencyStore((s) => s.changeConstituency);

  const [selectedConstituency, setSelectedConstituency] =
    useState<ConstituencyInfo | null>(null);
  const onConstituencySelectChange = (
    constituency: ConstituencyInfo | null,
  ) => {
    setSelectedConstituency(constituency);
    //changeConstituency(constituency);
  };

  const onAddConstituencyClick = () => {};

  const onEditConstituencyClick = () => {};

  return (
    <div className="flex flex-col w-full h-150">
      <div className="flex-none px-4 py-3 border-b border-border font-semibold">
        Constituencies
      </div>
      <div className="flex-1">
        <ConstituencySelect
          value={selectedConstituency?.constituencyId}
          onChange={onConstituencySelectChange}
        />

        <div>
          <AddEditConstituency
            selectedConstituency={selectedConstituency}
            onEditCancel={() => onConstituencySelectChange(null)}
          />
        </div>
      </div>
    </div>
  );
};
