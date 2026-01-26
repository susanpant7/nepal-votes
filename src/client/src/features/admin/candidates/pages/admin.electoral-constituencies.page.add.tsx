import { AddEditConstituency } from "@/features/admin/electoral-constituencies/components/add-edit-constituency.tsx";
import type { ConstituencyDetail } from "@/features/admin/electoral-constituencies/types/admin.electoral-constituncies.types.ts";
import { useConstituencyStore } from "@/stores/useConstituencyStore.ts";

export const AdminElectoralConstituenciesPageAdd = () => {
  const setConstituency = useConstituencyStore((s) => s.setConstituency);
  const newConstituencyDetail: ConstituencyDetail = {
    constituencyId: 0,
    constituencyName: "",
    provinceId: 0,
    provinceName: "",
    districtId: 0,
    districtName: "",
    municipalityWardInfos: [],
  };

  setConstituency(newConstituencyDetail);

  return <AddEditConstituency />;
};
