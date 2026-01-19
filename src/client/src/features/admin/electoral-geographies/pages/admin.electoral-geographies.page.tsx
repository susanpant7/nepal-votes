import { ProvincesTable } from "@/features/admin/electoral-geographies/components/ProvincesTable.tsx";
import { MunicipalitiesTable } from "@/features/admin/electoral-geographies/components/MunicipalitiesTable.tsx";
import { DistrictsTable } from "@/features/admin/electoral-geographies/components/DistrictsTable.tsx";
import { VotingPlacesTable } from "@/features/admin/electoral-geographies/components/VotingPlacesTable.tsx";
import { useState } from "react";
import type {
  DistrictInfo,
  MunicipalityInfo,
  ProvinceInfo,
  WardInfo,
} from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { WardsTable } from "@/features/admin/electoral-geographies/components/WardsTable.tsx";
import type { GoBackProps } from "@/features/admin/electoral-geographies/components/GeographicTableContainer.tsx";

export const AdminElectoralGeographiesPage = () => {
  const [showTable, setShowTable] = useState<"P" | "D" | "M" | "W" | "VP">("P");
  const [selectedProvince, setSelectedProvince] = useState<ProvinceInfo>();
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictInfo>();
  const [selectedMunicipality, setSelectedMunicipality] =
    useState<MunicipalityInfo>();
  const [selectedWard, setSelectedWard] = useState<WardInfo>();

  const handleOnViewProvincesClick = () => {
    setShowTable("P");
  };
  const handleOnViewDistrictsClick = (province: ProvinceInfo) => {
    setSelectedProvince(province);
    setShowTable("D");
  };
  const handleOnViewMunicipalitiesClick = (district: DistrictInfo) => {
    setSelectedDistrict(district);
    setShowTable("M");
  };

  const handleOnViewWardsClick = (municipality: MunicipalityInfo) => {
    setSelectedMunicipality(municipality);
    setShowTable("W");
  };
  const handleOnViewVotingPlacesClick = (ward: WardInfo) => {
    setSelectedWard(ward);
    setShowTable("VP");
  };

  const goBackPropsInDistrict: GoBackProps = {
    provinceName: selectedProvince?.provinceName!,
    backToProvinces: handleOnViewProvincesClick,
  };

  const goBackPropsInMunicipality: GoBackProps = {
    ...goBackPropsInDistrict,
    districtName: selectedDistrict?.districtName!,
    backToDistricts: () => handleOnViewDistrictsClick(selectedProvince!),
  };

  const goBackPropsInWard: GoBackProps = {
    ...goBackPropsInMunicipality,
    municipalityName: selectedMunicipality?.municipalityName!,
    backToMunicipalities: () =>
      handleOnViewMunicipalitiesClick(selectedDistrict!),
  };

  const goBackPropsInVotingPlace: GoBackProps = {
    ...goBackPropsInWard,
    wardName: selectedWard?.wardName!,
    backToWards: () => handleOnViewWardsClick(selectedMunicipality!),
  };

  return (
    <>
      {showTable == "P" && (
        <ProvincesTable onViewDistrictsClick={handleOnViewDistrictsClick} />
      )}
      {showTable == "D" && (
        <DistrictsTable
          province={selectedProvince!}
          viewMunicipalities={handleOnViewMunicipalitiesClick}
          goBackProps={goBackPropsInDistrict}
        />
      )}
      {showTable == "M" && (
        <MunicipalitiesTable
          district={selectedDistrict!}
          viewWards={handleOnViewWardsClick}
          goBackProps={goBackPropsInMunicipality}
        />
      )}
      {showTable == "W" && (
        <WardsTable
          municipality={selectedMunicipality!}
          viewVotingPlaces={handleOnViewVotingPlacesClick}
          goBackProps={goBackPropsInWard}
        />
      )}
      {showTable == "VP" && (
        <VotingPlacesTable
          ward={selectedWard!}
          goBackProps={goBackPropsInVotingPlace}
        />
      )}
    </>
  );
};
