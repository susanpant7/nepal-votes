import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useAdminElectoralGeographyQuery } from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.query.ts";

type FilterBarProps = {
  onProvinceChange?: (provinceId: number) => void;
  onDistrictChange?: (districtId: number) => void;
};

export const FilterBar = ({
  onProvinceChange,
  onDistrictChange,
}: FilterBarProps) => {
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [districtId, setDistrictId] = useState<number | null>(null);

  const {
    data: provinces = [],
    isLoading: provincesLoading,
    isError: provincesError,
  } = useAdminElectoralGeographyQuery.getProvinces();

  const {
    data: districts = [],
    isLoading: districtsLoading,
    isError: districtsError,
  } = useAdminElectoralGeographyQuery.getDistrictsByProvinceId(provinceId ?? 0);

  const handleProvinceChange = (value: string) => {
    const id = Number(value);
    setProvinceId(id);

    setDistrictId(null);
    onProvinceChange?.(id);
  };

  const handleDistrictChange = (value: string) => {
    const id = Number(value);
    setDistrictId(id);

    onDistrictChange?.(id);
  };

  const getProvincePlaceholder = () => {
    if (provincesLoading) return `Loading provinces...`;
    if (provincesError) return `Error loading provinces`;
    return "Select province";
  };

  const getDistrictPlaceholder = () => {
    if (districtsLoading) return "Loading districts...";
    if (districtsError) return "Error loading districts";
    return "Select district";
  };

  return (
    <div className="flex">
      <div className="inline-flex flex-wrap items-center gap-4 rounded-lg border bg-muted/40 px-4 py-3">
        {/* Province Dropdown */}
        <Select
          value={provinceId !== null ? provinceId.toString() : undefined}
          onValueChange={handleProvinceChange}
          disabled={provincesLoading || provincesError}
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder={getProvincePlaceholder()} />
          </SelectTrigger>
          <SelectContent>
            {provinces.map((p) => (
              <SelectItem key={p.provinceId} value={p.provinceId.toString()}>
                {p.provinceName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* District Dropdown */}
        <Select
          value={districtId !== null ? districtId.toString() : undefined}
          onValueChange={handleDistrictChange}
          disabled={!provinceId || districtsLoading || districtsError}
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder={getDistrictPlaceholder()} />
          </SelectTrigger>
          <SelectContent>
            {districts.map((d) => (
              <SelectItem key={d.districtId} value={d.districtId.toString()}>
                {d.districtName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
