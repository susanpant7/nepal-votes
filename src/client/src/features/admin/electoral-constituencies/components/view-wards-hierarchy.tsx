import { useAdminConstituencyQuery } from "@/features/admin/electoral-constituencies/api/admin.electoral-constituencies.query.ts";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper.tsx";
import { WardConstituencyItem } from "@/features/admin/electoral-constituencies/components/ward-constituency-item.tsx";
import { CollapsibleSection } from "@/features/admin/electoral-constituencies/components/collapsible-section.tsx";

export const ViewWardsHierarchy = () => {
  const {
    data: queryData,
    isLoading,
    isError,
    refetch,
  } = useAdminConstituencyQuery.getUnassignedWards();

  return (
    <div className="space-y-4">
      <QueryWrapper isLoading={isLoading} isError={isError} refetch={refetch}>
        <div className="mt-4 space-y-6 h-125 overflow-y-scroll custom-scrollbar pr-2">
          {queryData?.map((province) => (
            <CollapsibleSection
              key={province.provinceId}
              title={province.provinceName}
              level="province"
            >
              {province.districts.map((district) => (
                <CollapsibleSection
                  key={district.districtId}
                  title={district.districtName}
                  level="district"
                >
                  {district.municipalities.map((municipality) => (
                    <CollapsibleSection
                      key={municipality.municipalityId}
                      title={municipality.municipalityName}
                      level="municipality"
                    >
                      <div className="space-y-2 pt-2">
                        {municipality.wards.map((ward) => (
                          <WardConstituencyItem
                            key={ward.wardId}
                            municipality={municipality}
                            ward={ward}
                          />
                        ))}
                      </div>
                    </CollapsibleSection>
                  ))}
                </CollapsibleSection>
              ))}
            </CollapsibleSection>
          ))}
        </div>
      </QueryWrapper>
    </div>
  );
};
