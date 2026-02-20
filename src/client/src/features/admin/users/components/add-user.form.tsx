import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft, Save } from "lucide-react";
import { useAdminUserQuery } from "../api/admin.users.query";
import { GeographicalDivisionPage } from "@/features/admin/electoral-geographies/components/geographical-division-page.tsx";
import type { WardInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import type { AddUserRequest } from "../types/admin.users.types";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { ImageField } from "@/components/ui/image-field.tsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Props {
    userId?: number;
}

const AddUserForm = ({ userId }: Props) => {
    const navigate = useNavigate();
    const { useRoles, useAddUserMutation, useUpdateUserMutation, useUser } = useAdminUserQuery();
    const { data: roles, isLoading: rolesLoading } = useRoles();
    const { data: existingUser, isLoading: userLoading } = useUser(userId || 0);

    const addUserMutation = useAddUserMutation();
    const updateUserMutation = useUpdateUserMutation();

    const [formData, setFormData] = useState<AddUserRequest>({
        firstNameEn: "",
        middleNameEn: "",
        lastNameEn: "",
        firstNameNp: "",
        middleNameNp: "",
        lastNameNp: "",
        dateOfBirth: "",
        mobileNumber: "",
        nationalIdNumber: "",
        voterIdNumber: "",
        wardId: 0,
        roles: [],
        status: "Approved",
        nationalIdCardFile: null,
        voterCardFile: null,
        passportFile: null,
    });

    const [showAdminRoles, setShowAdminRoles] = useState(false);

    const [selectedWard, setSelectedWard] = useState<WardInfo | null>(null);

    useEffect(() => {
        if (existingUser) {
            let natIdStr: string | null = null;
            let votIdStr: string | null = null;
            let passportStr: string | null = null;

            if (existingUser.documents && existingUser.documents.length > 0) {
                existingUser.documents.forEach(doc => {
                    const dataUrl = `data:${doc.contentType};base64,${doc.content}`;
                    if (doc.documentType === 4) natIdStr = dataUrl; // National Identity
                    else if (doc.documentType === 5) votIdStr = dataUrl; // Voter Identity
                    else if (doc.documentType === 3) passportStr = dataUrl; // Passport
                });
            }

            setFormData({
                firstNameEn: existingUser.firstNameEn,
                middleNameEn: existingUser.middleNameEn || "",
                lastNameEn: existingUser.lastNameEn,
                firstNameNp: existingUser.firstNameNp,
                middleNameNp: existingUser.middleNameNp || "",
                lastNameNp: existingUser.lastNameNp,
                dateOfBirth: existingUser.dateOfBirth,
                mobileNumber: existingUser.mobileNumber,
                nationalIdNumber: existingUser.nationalIdNumber,
                voterIdNumber: existingUser.voterIdNumber,
                wardId: existingUser.wardId,
                roles: existingUser.roles,
                status: existingUser.status,
                nationalIdCardFile: natIdStr,
                voterCardFile: votIdStr,
                passportFile: passportStr,
            });

            setSelectedWard({
                wardId: existingUser.wardId,
                wardNumber: existingUser.wardNumber || 0,
                wardName: existingUser.wardName || "",
                municipalityId: 0,
            } as WardInfo);
        }
    }, [existingUser]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (name: string, file: File | null) => {
        setFormData((prev) => ({ ...prev, [name]: file }));
    };

    const handleRoleToggle = (roleName: string) => {
        setFormData((prev) => {
            const isSelected = prev.roles.includes(roleName);
            return {
                ...prev,
                roles: isSelected
                    ? prev.roles.filter((r) => r !== roleName)
                    : [...prev.roles, roleName],
            };
        });
    };

    const onSelectWard = (ward: WardInfo) => {
        setSelectedWard(ward);
        setFormData((prev) => ({ ...prev, wardId: ward.wardId }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (userId) {
                await updateUserMutation.mutateAsync({ userId, user: formData });
            } else {
                await addUserMutation.mutateAsync(formData);
            }
            navigate({ to: ROUTES.ADMIN_USERS });
        } catch (error) {
            console.error("Failed to save user:", error);
        }
    };

    const isFormValid =
        formData.firstNameEn &&
        formData.lastNameEn &&
        formData.firstNameNp &&
        formData.lastNameNp &&
        formData.mobileNumber &&
        formData.dateOfBirth &&
        formData.nationalIdNumber &&
        formData.nationalIdNumber &&
        formData.voterIdNumber &&
        formData.wardId > 0 &&
        formData.roles.length > 0;

    if (userId && userLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Spinner className="h-8 w-8" />
                <p className="mt-4 text-muted-foreground animate-pulse text-sm">Loading user details...</p>
            </div>
        );
    }

    return (
        <div className="h-full flex flex-col overflow-hidden bg-background">
            <div className="flex-none pt-6 pb-4 px-6 border-b bg-card shadow-sm">
                <div className="max-w-6xl mx-auto flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.history.back()}
                            className="mb-1 -ml-2 text-muted-foreground hover:bg-transparent hover:text-primary"
                        >
                            <ChevronLeft className="mr-1 h-4 w-4" /> Back to User List
                        </Button>
                        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                            {userId ? "Edit User Profile" : "Register New User"}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {userId ? "Update user profile, roles, and location." : "Create account, assign roles, and upload identity documents."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto min-h-0 bg-muted/20">
                <div className="max-w-5xl mx-auto py-8 px-4">

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left Column: Personal & IDs */}
                            <div className="space-y-6">
                                <section className="bg-card rounded-xl border p-6 shadow-sm space-y-4">
                                    <h3 className="text-lg font-bold">Personal Names</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-semibold text-muted-foreground">English</h4>
                                            <div className="space-y-2">
                                                <Label htmlFor="firstNameEn">First Name</Label>
                                                <Input id="firstNameEn" name="firstNameEn" value={formData.firstNameEn} onChange={handleInputChange} required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="middleNameEn">Middle Name</Label>
                                                <Input id="middleNameEn" name="middleNameEn" value={formData.middleNameEn} onChange={handleInputChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastNameEn">Last Name</Label>
                                                <Input id="lastNameEn" name="lastNameEn" value={formData.lastNameEn} onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <h4 className="text-sm font-semibold text-muted-foreground">Nepali</h4>
                                            <div className="space-y-2">
                                                <Label htmlFor="firstNameNp">First Name (Np)</Label>
                                                <Input id="firstNameNp" name="firstNameNp" value={formData.firstNameNp} onChange={handleInputChange} required />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="middleNameNp">Middle Name (Np)</Label>
                                                <Input id="middleNameNp" name="middleNameNp" value={formData.middleNameNp} onChange={handleInputChange} />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lastNameNp">Last Name (Np)</Label>
                                                <Input id="lastNameNp" name="lastNameNp" value={formData.lastNameNp} onChange={handleInputChange} required />
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-card rounded-xl border p-6 shadow-sm space-y-4">
                                    <h3 className="text-lg font-bold">Account & Identity</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="mobileNumber">Mobile Number</Label>
                                            <Input id="mobileNumber" name="mobileNumber" value={formData.mobileNumber} onChange={handleInputChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                                            <Input id="dateOfBirth" name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="nationalIdNumber">National ID Number</Label>
                                            <Input id="nationalIdNumber" name="nationalIdNumber" value={formData.nationalIdNumber} onChange={handleInputChange} required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="voterIdNumber">Voter ID Number</Label>
                                            <Input id="voterIdNumber" name="voterIdNumber" value={formData.voterIdNumber} onChange={handleInputChange} required />
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-card rounded-xl border p-6 shadow-sm space-y-4">
                                    <h3 className="text-lg font-bold">Document Uploads</h3>
                                    <p className="text-xs text-muted-foreground italic">
                                        Identity documents are optional but recommended for verification.
                                    </p>
                                    <div className="grid grid-cols-1 gap-6">
                                        <ImageField
                                            label="Voter Card"
                                            value={formData.voterCardFile}
                                            onChange={(file) => handleFileChange("voterCardFile", file)}
                                        />
                                        <ImageField
                                            label="National ID Card"
                                            value={formData.nationalIdCardFile}
                                            onChange={(file) => handleFileChange("nationalIdCardFile", file)}
                                        />
                                        <ImageField
                                            label="Passport (Optional)"
                                            value={formData.passportFile}
                                            onChange={(file) => handleFileChange("passportFile", file)}
                                        />
                                    </div>
                                </section>
                            </div>

                            {/* Right Column: Roles & Location */}
                            <div className="space-y-6">
                                <section className="bg-card rounded-xl border p-6 shadow-sm space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold">Assign Roles & Status</h3>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setShowAdminRoles(!showAdminRoles)}
                                            className={showAdminRoles ? "text-primary border-primary" : ""}
                                        >
                                            {showAdminRoles ? "Hide Admin Roles" : "Show Admin Roles"}
                                        </Button>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>User Status</Label>
                                            <Select
                                                value={formData.status}
                                                onValueChange={(val) => setFormData(prev => ({ ...prev, status: val }))}
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Select Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Requested">Requested</SelectItem>
                                                    <SelectItem value="Pending">Pending</SelectItem>
                                                    <SelectItem value="Approved">Approved</SelectItem>
                                                    <SelectItem value="Rejected">Rejected</SelectItem>
                                                    <SelectItem value="OtpPending">OTP Pending</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Roles</Label>
                                            {rolesLoading ? (
                                                <div className="flex justify-center p-4">
                                                    <Spinner />
                                                </div>
                                            ) : (
                                                <div className="flex flex-wrap gap-4 pt-2">
                                                    {roles
                                                        ?.filter(role => showAdminRoles || (role.roleName !== "ADMIN" && role.roleName !== "SUPER_ADMIN"))
                                                        ?.map((role) => (
                                                            <div key={role.roleId} className="flex items-center space-x-2 bg-muted/30 px-3 py-2 rounded-lg border">
                                                                <Checkbox
                                                                    id={`role-${role.roleId}`}
                                                                    checked={formData.roles.includes(role.roleName)}
                                                                    onCheckedChange={() => handleRoleToggle(role.roleName)}
                                                                />
                                                                <Label
                                                                    htmlFor={`role-${role.roleId}`}
                                                                    className="text-sm font-medium leading-none cursor-pointer"
                                                                >
                                                                    {role.roleName}
                                                                </Label>
                                                            </div>
                                                        ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </section>

                                <section className="bg-card rounded-xl border p-6 shadow-sm space-y-4">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold">Select Ward</h3>
                                        {selectedWard && (
                                            <Badge variant="secondary">Selected: Ward {selectedWard.wardNumber}</Badge>
                                        )}
                                    </div>
                                    <div className="min-h-[400px] max-h-[500px] border rounded-lg overflow-auto bg-card">
                                        <GeographicalDivisionPage
                                            onSelectWard={onSelectWard}
                                            allowAddEdit={false}
                                            hideViewVotingPlaces={true}
                                            hideMunicipalityType={true}
                                            selectedWardId={formData.wardId}
                                        />
                                    </div>
                                    {selectedWard && (
                                        <div className="p-3 bg-muted rounded-md text-sm">
                                            <p className="font-semibold text-primary">Location Confirmed:</p>
                                            <p>{selectedWard.wardName} (Ward No. {selectedWard.wardNumber})</p>
                                            <p className="text-xs text-muted-foreground italic">
                                                {(selectedWard as any).municipalityName || existingUser?.municipalityName}
                                            </p>
                                        </div>
                                    )}
                                </section>
                            </div>
                        </div>

                        <div className="flex justify-end pt-4 border-t">
                            <Button
                                type="submit"
                                size="lg"
                                className="w-full md:w-auto px-12"
                                disabled={!isFormValid || addUserMutation.isPending || updateUserMutation.isPending}
                            >
                                {addUserMutation.isPending || updateUserMutation.isPending ? (
                                    <>
                                        <Spinner className="mr-2 h-4 w-4" /> Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" /> {userId ? "Update User" : "Create User"}
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddUserForm;
