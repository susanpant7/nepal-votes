import { MunicipalitiesList } from "@/features/admin/electoral-constituencies/components/municipalities-list.tsx";

export interface Props {
  districtId: number | null;
}
export const ConstituencyMunicipalitiesSection = ({ districtId }: Props) => {
  return (
    <div className="col-span-3 p-5">
      {districtId ? (
        <MunicipalitiesList districtId={districtId} />
      ) : (
        <>
          <h3>
            {districtId} Select a district to view the municipalities ward
            assignments
          </h3>
        </>
      )}
    </div>
  );
};
