
import { useCandidateQuery } from "@/features/candidate/api/candidate.query";
import { MultiSelect } from "@/components/ui/multi-select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export interface CandidateFilterValues {
    provinceIds: number[];
    districtIds: number[];
    constituencyIds: number[];
    politicalPartyIds: number[];
    isIndependent: boolean;
    name: string;
}

interface CandidateFiltersProps {
    onFilterChange: (filters: CandidateFilterValues) => void;
    disabled?: boolean;
}

export const CandidateFilters = ({ onFilterChange, disabled }: CandidateFiltersProps) => {
    const [selectedProvinces, setSelectedProvinces] = useState<string[]>([]);
    const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
    const [selectedConstituencies, setSelectedConstituencies] = useState<string[]>([]);
    const [selectedParties, setSelectedParties] = useState<string[]>([]);
    const [candidateName, setCandidateName] = useState<string>("");

    // --- Queries ---
    const { data: provinces = [] } = useCandidateQuery.useGetProvinces();
    const { data: allDistricts = [] } = useCandidateQuery.useGetAllDistricts();
    const { data: allConstituencies = [] } = useCandidateQuery.useGetAllConstituencies();
    const { data: parties = [] } = useCandidateQuery.useGetParties();


    // --- Derived Options ---
    const filteredDistricts =
        selectedProvinces.length > 0
            ? allDistricts.filter((d) => selectedProvinces.includes(d.provinceId.toString()))
            : allDistricts;

    const filteredConstituencies =
        selectedDistricts.length > 0
            ? allConstituencies.filter((c) => selectedDistricts.includes(c.districtId.toString()))
            : selectedProvinces.length > 0
                ? allConstituencies.filter((c) => selectedProvinces.includes(c.provinceId.toString()))
                : allConstituencies;

    const hasActiveFilters =
        selectedProvinces.length > 0 ||
        selectedDistricts.length > 0 ||
        selectedConstituencies.length > 0 ||
        selectedParties.length > 0 ||
        candidateName.trim().length > 0;

    const activeFilterCount =
        selectedProvinces.length + selectedDistricts.length +
        selectedConstituencies.length + selectedParties.length +
        (candidateName.trim().length > 0 ? 1 : 0);

    const triggerFind = (
        provs = selectedProvinces,
        dists = selectedDistricts,
        consts = selectedConstituencies,
        prts = selectedParties,
        name = candidateName,
    ) => {
        const independentSelected = prts.includes("independent");
        const partyIds = prts.filter(p => p !== "independent").map(Number);
        onFilterChange({
            provinceIds: provs.map(Number),
            districtIds: dists.map(Number),
            constituencyIds: consts.map(Number),
            politicalPartyIds: partyIds,
            isIndependent: independentSelected,
            name: name,
        });
    };

    const handleClearAll = () => {
        setSelectedProvinces([]);
        setSelectedDistricts([]);
        setSelectedConstituencies([]);
        setSelectedParties([]);
        setCandidateName("");
        onFilterChange({ provinceIds: [], districtIds: [], constituencyIds: [], politicalPartyIds: [], isIndependent: false, name: "" });
    };

    return (
        <div className="mb-8 rounded-2xl border border-border/60 bg-card shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border/50 bg-muted/30">
                <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-primary/10">
                        <SlidersHorizontal className="h-4 w-4 text-primary" />
                    </div>
                    <span className="font-semibold text-sm">Filter Candidates</span>
                    {hasActiveFilters && (
                        <Badge variant="secondary" className="text-xs px-2 py-0.5 rounded-full">
                            {activeFilterCount} active
                        </Badge>
                    )}
                </div>
                {hasActiveFilters && !disabled && (
                    <button
                        onClick={handleClearAll}
                        disabled={disabled}
                        className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-destructive transition-colors"
                    >
                        <X className="h-3 w-3" />
                        Clear all
                    </button>
                )}
            </div>

            {/* Filter Grid */}
            <div className="p-6 space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Province */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Province</label>
                        <MultiSelect
                            options={provinces.map((p) => ({
                                label: p.provinceName,
                                value: p.provinceId.toString(),
                            }))}
                            selected={selectedProvinces}
                            onChange={(vals) => {
                                setSelectedProvinces(vals);
                                const validDistrictIds = selectedDistricts.filter(dId => {
                                    const dist = allDistricts.find(d => d.districtId.toString() === dId);
                                    return dist && vals.includes(dist.provinceId.toString());
                                });
                                if (validDistrictIds.length !== selectedDistricts.length) {
                                    setSelectedDistricts(validDistrictIds);
                                }
                                const validConstituencyIds = selectedConstituencies.filter(cId => {
                                    const cons = allConstituencies.find(c => c.constituencyId.toString() === cId);
                                    if (!cons) return false;
                                    if (validDistrictIds.length > 0) return validDistrictIds.includes(cons.districtId.toString());
                                    return vals.includes(cons.provinceId.toString());
                                });
                                if (validConstituencyIds.length !== selectedConstituencies.length) {
                                    setSelectedConstituencies(validConstituencyIds);
                                }
                            }}
                            placeholder="All provinces"
                            disabled={disabled}
                        />
                    </div>

                    {/* District */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">District</label>
                        <MultiSelect
                            options={filteredDistricts.map((d) => ({
                                label: d.districtName,
                                value: d.districtId.toString(),
                            }))}
                            selected={selectedDistricts}
                            onChange={(vals) => {
                                setSelectedDistricts(vals);
                                let validConstituencyIds = selectedConstituencies;
                                if (vals.length > 0) {
                                    validConstituencyIds = selectedConstituencies.filter(cId => {
                                        const cons = allConstituencies.find(c => c.constituencyId.toString() === cId);
                                        return cons && vals.includes(cons.districtId.toString());
                                    });
                                } else if (selectedProvinces.length > 0) {
                                    validConstituencyIds = selectedConstituencies.filter(cId => {
                                        const cons = allConstituencies.find(c => c.constituencyId.toString() === cId);
                                        return cons && selectedProvinces.includes(cons.provinceId.toString());
                                    });
                                }
                                if (validConstituencyIds.length !== selectedConstituencies.length) {
                                    setSelectedConstituencies(validConstituencyIds);
                                }
                            }}
                            placeholder="All districts"
                            disabled={disabled}
                        />
                    </div>

                    {/* Constituency */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Constituency</label>
                        <MultiSelect
                            options={filteredConstituencies.map((c) => ({
                                label: c.constituencyName,
                                value: c.constituencyId.toString(),
                            }))}
                            selected={selectedConstituencies}
                            onChange={setSelectedConstituencies}
                            placeholder="All constituencies"
                            disabled={disabled}
                        />
                    </div>
                </div>

                {/* Second Row: Name, Party, Find Button */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Name Filter */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Candidate Name</label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                type="text"
                                value={candidateName}
                                onChange={(e) => setCandidateName(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") triggerFind();
                                }}
                                disabled={disabled}
                                placeholder="Search by name..."
                                className="w-full pl-9 pr-4 py-2 text-sm bg-background border border-input rounded-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    </div>

                    {/* Political Party */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Political Party / Affiliation</label>
                        <MultiSelect
                            options={[
                                { label: "Independent", value: "independent" },
                                ...parties
                                    .filter(p => p.politicalPartyNameEn.toLowerCase() !== "independent")
                                    .map((party) => ({
                                        label: party.politicalPartyNameEn,
                                        value: party.politicalPartyId.toString(),
                                    }))
                            ]}
                            selected={selectedParties}
                            onChange={setSelectedParties}
                            placeholder="All parties"
                            disabled={disabled}
                        />
                    </div>

                    {/* Find Button */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-transparent uppercase tracking-wide select-none">Find</label>
                        <Button
                            onClick={() => triggerFind()}
                            className="w-full gap-2 font-semibold"
                            disabled={disabled}
                        >
                            <Search className="h-4 w-4" />
                            Find Candidates
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
