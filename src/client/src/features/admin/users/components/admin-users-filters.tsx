import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useAdminElectoralGeographyQuery } from "@/features/admin/electoral-geographies/api/admin.electoral-geographies.query";
import type { UserFilters } from "../types/admin.users.types";
import { useState } from "react";
import { Search, X, Loader2, ChevronDown, ChevronUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserSearchDropdown } from "@/features/users/user-search/components/user-search-dropdown.tsx";
import { useAdminUserQuery } from "../api/admin.users.query";
import { cn } from "@/lib/utils";

interface Props {
    onSearch: (filters: Omit<UserFilters, 'page' | 'pageSize'>) => void;
    isLoading?: boolean;
}

export const AdminUsersFilters = ({ onSearch, isLoading }: Props) => {
    const { useRoles } = useAdminUserQuery();
    const { data: roles } = useRoles();

    const [isExpanded, setIsExpanded] = useState(true);

    const [localFilters, setLocalFilters] = useState<Omit<UserFilters, 'page' | 'pageSize'>>({
        userId: undefined,
        mobileNumber: "",
        nationalId: "",
        voterId: "",
        provinceId: undefined,
        districtId: undefined,
        municipalityId: undefined,
        roleId: undefined,
        status: undefined,
    });

    const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

    const { data: provinces } = useAdminElectoralGeographyQuery.getProvinces();
    const { data: districts } = useAdminElectoralGeographyQuery.getDistrictsByProvinceId(
        localFilters.provinceId || 0
    );
    const { data: municipalities } = useAdminElectoralGeographyQuery.getMunicipalitiesByDistrictId(
        localFilters.districtId || null
    );

    const handleSearch = () => {
        onSearch(localFilters);
    };

    const handleClear = () => {
        const cleared = {
            userId: undefined,
            mobileNumber: "",
            nationalId: "",
            voterId: "",
            provinceId: undefined,
            districtId: undefined,
            municipalityId: undefined,
            roleId: undefined,
            status: undefined,
        };
        setLocalFilters(cleared);
        setSelectedUserName(null);
    };

    return (
        <div className="bg-card rounded-xl border shadow-sm overflow-hidden transition-all duration-300">
            <div
                className="p-4 border-b bg-muted/30 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-primary" />
                    <h2 className="font-semibold text-sm">Search Filters</h2>
                </div>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            </div>

            <div className={cn(
                "transition-all duration-300 ease-in-out",
                isExpanded ? "max-h-[1000px] opacity-100 p-6" : "max-h-0 opacity-0 p-0 pointer-events-none"
            )}>
                <div className="space-y-6">
                    {/* Row 1: Search Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Username / Full Name</label>
                            <UserSearchDropdown
                                onSelect={(user) => {
                                    setLocalFilters(prev => ({ ...prev, userId: user?.userId }));
                                    setSelectedUserName(user?.fullName || null);
                                }}
                                currentUserName={selectedUserName}
                                searchLabel="Search by name..."
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Mobile Number</label>
                            <Input
                                placeholder="e.g. 9841..."
                                value={localFilters.mobileNumber}
                                onChange={(e) => setLocalFilters(prev => ({ ...prev, mobileNumber: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">National ID</label>
                            <Input
                                placeholder="National ID..."
                                value={localFilters.nationalId}
                                onChange={(e) => setLocalFilters(prev => ({ ...prev, nationalId: e.target.value }))}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Voter ID</label>
                            <Input
                                placeholder="Voter ID..."
                                value={localFilters.voterId}
                                onChange={(e) => setLocalFilters(prev => ({ ...prev, voterId: e.target.value }))}
                            />
                        </div>
                    </div>

                    {/* Row 2: Geography & Role Filters */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Province</label>
                            <Select
                                value={localFilters.provinceId?.toString() || "all"}
                                onValueChange={(val) =>
                                    setLocalFilters(prev => ({
                                        ...prev,
                                        provinceId: val === "all" ? undefined : Number(val),
                                        districtId: undefined,
                                        municipalityId: undefined,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Province" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Provinces</SelectItem>
                                    {provinces?.map((p) => (
                                        <SelectItem key={p.provinceId} value={p.provinceId.toString()}>
                                            {p.provinceName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">District</label>
                            <Select
                                disabled={!localFilters.provinceId}
                                value={localFilters.districtId?.toString() || "all"}
                                onValueChange={(val) =>
                                    setLocalFilters(prev => ({
                                        ...prev,
                                        districtId: val === "all" ? undefined : Number(val),
                                        municipalityId: undefined,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select District" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Districts</SelectItem>
                                    {districts?.map((d) => (
                                        <SelectItem key={d.districtId} value={d.districtId.toString()}>
                                            {d.districtName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Municipality</label>
                            <Select
                                disabled={!localFilters.districtId}
                                value={localFilters.municipalityId?.toString() || "all"}
                                onValueChange={(val) =>
                                    setLocalFilters(prev => ({
                                        ...prev,
                                        municipalityId: val === "all" ? undefined : Number(val),
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Municipality" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Municipalities</SelectItem>
                                    {municipalities?.map((m) => (
                                        <SelectItem
                                            key={m.municipalityId}
                                            value={m.municipalityId.toString()}
                                        >
                                            {m.municipalityName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Role</label>
                            <Select
                                value={localFilters.roleId?.toString() || "all"}
                                onValueChange={(val) =>
                                    setLocalFilters(prev => ({
                                        ...prev,
                                        roleId: val === "all" ? undefined : Number(val),
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Roles</SelectItem>
                                    {roles?.map((r) => (
                                        <SelectItem key={r.roleId} value={r.roleId.toString()}>
                                            {r.roleName}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 3: Status & Search Button */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Status</label>
                            <Select
                                value={localFilters.status || "all"}
                                onValueChange={(val) =>
                                    setLocalFilters(prev => ({
                                        ...prev,
                                        status: val === "all" ? undefined : val,
                                    }))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="Requested">Requested</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Approved">Approved</SelectItem>
                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                    <SelectItem value="OtpPending">OTP Pending</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="md:col-span-1 flex gap-2">
                            <Button
                                className="flex-1 shadow-md bg-primary hover:bg-primary/90"
                                onClick={handleSearch}
                                disabled={isLoading}
                                size="sm"
                            >
                                {isLoading ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Search className="mr-2 h-3.5 w-3.5" />
                                )}
                                Search
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleClear}
                                title="Clear Filters"
                                className="shrink-0 px-2"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
