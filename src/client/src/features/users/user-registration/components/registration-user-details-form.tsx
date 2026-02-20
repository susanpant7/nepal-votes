import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
  type SetStateAction,
  useState,
} from "react";
import { GeographicalDivisionPage } from "@/features/admin/electoral-geographies/components/geographical-division-page.tsx";
import type { WardInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import { type UserRegistrationForm } from "@/features/users/user-registration/types/users.user-registration.types.ts";
import { RegistrationDocumentUpload } from "@/features/users/user-registration/components/registration-document-upload.tsx";
import { Badge } from "@/components/ui/badge.tsx";

export interface RegistrationUserDetailsFormProps {
  confirmUserDetails: () => void;
  formData: UserRegistrationForm;
  setFormData: Dispatch<SetStateAction<UserRegistrationForm>>;
}
export const RegistrationUserDetailsForm = ({
  confirmUserDetails,
  formData,
  setFormData,
}: RegistrationUserDetailsFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("name ==> ", name);
    console.log("value ==> ", value);
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));

    console.log("formData ==> ", formData);
  };

  const onSelectWard = (wardInfo: WardInfo) => {
    const isDeselecting =
      formData.ward?.wardId === wardInfo.wardId;
    setFormData((prev) => ({
      ...prev,
      ward: isDeselecting ? null : wardInfo,
    }));

    if (errors.ward) setErrors((prev) => ({ ...prev, ward: "" }));
  };

  const handleNationalIdDocumentChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, nIdDocument: file }));
    setErrors((prev) => ({ ...prev, idVerification: "", nIdDocument: "" }));
  };

  const handleVoterIdDocumentChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, voterIdDocument: file }));
    setErrors((prev) => ({ ...prev, idVerification: "", voterIdDocument: "" }));
  };

  const handlePassportDocumentChange = (file: File | null) => {
    setFormData((prev) => ({ ...prev, passportDocument: file }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.firstNameNp.trim()) newErrors.firstNameNp = "First name (Nepali) is required";
    if (!formData.lastNameNp.trim()) newErrors.lastNameNp = "Last name (Nepali) is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit number";
    }

    if (!formData.ward) {
      newErrors.ward = "Please select a ward";
    }

    const hasVoterIdNum = formData.voterIdNumber.trim();
    const hasNationalIdNum = formData.nIdNumber.trim();

    if (!hasVoterIdNum) {
      newErrors.voterIdNumber = "Voter ID number is required";
    }
    if (!hasNationalIdNum) {
      newErrors.nIdNumber = "National ID number is required";
    }
    if (!formData.voterIdDocument) {
      newErrors.voterIdDocument = "Voter ID document image is required";
    }
    if (!formData.nIdDocument) {
      newErrors.nIdDocument = "National ID document image is required";
    }

    if (!hasVoterIdNum || !hasNationalIdNum || !formData.voterIdDocument || !formData.nIdDocument) {
      newErrors.idVerification = "Please provide both Voter ID and National ID details.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      confirmUserDetails();
      window.scrollTo(0, 0);
    }
  };

  const today = new Date();

  // To be at least 18 years old
  const eighteenYearsAgo = new Date();
  eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
  const maxDob = eighteenYearsAgo.toISOString().split("T")[0];

  return (
    <div className="container mx-auto py-10 px-4 md:px-8 max-w-7xl">
      <form onSubmit={handleNext} className="space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-primary">
              User Registration
            </h2>
            <p className="text-muted-foreground">
              Fill in your identity details and select your designated voting
              station.
            </p>
          </div>
          <div className="flex items-center gap-2 p-1 rounded-lg px-3 py-2 border shadow-sm">
            <div className="h-2 w-2 rounded-full animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Step 1: Details
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Input Fields */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section: Personal Details */}
            <section className=" rounded-xl border p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-1 rounded-full" />
                <h3 className="text-lg font-bold">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className={`text-xs font-bold uppercase transition-colors ${errors.firstName ? "text-destructive" : "text-muted-foreground"}`}>First Name <span className="text-destructive">*</span></Label>
                  <Input id="firstName" name="firstName" placeholder="Janak" value={formData.firstName} onChange={handleInputChange} className={errors.firstName ? "border-destructive ring-destructive/20" : "focus:bg-background transition-all"} />
                  {errors.firstName && <p className="text-[10px] font-bold text-destructive">{errors.firstName}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="middleName" className="text-xs font-bold uppercase text-muted-foreground">Middle Name</Label>
                  <Input id="middleName" name="middleName" placeholder="Raj" value={formData.middleName} onChange={handleInputChange} className="focus:bg-background transition-all" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className={`text-xs font-bold uppercase transition-colors ${errors.lastName ? "text-destructive" : "text-muted-foreground"}`}>Last Name <span className="text-destructive">*</span></Label>
                  <Input id="lastName" name="lastName" placeholder="Panta" value={formData.lastName} onChange={handleInputChange} className={errors.lastName ? "border-destructive ring-destructive/20" : "focus:bg-background transition-all"} />
                  {errors.lastName && <p className="text-[10px] font-bold text-destructive">{errors.lastName}</p>}
                </div>
              </div>

              {/* Nepali Names Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstNameNp" className={`text-xs font-bold uppercase transition-colors ${errors.firstNameNp ? "text-destructive" : "text-muted-foreground"}`}>FirstName (Nepali) <span className="text-destructive">*</span></Label>
                  <Input id="firstNameNp" name="firstNameNp" placeholder="जनक" value={formData.firstNameNp} onChange={handleInputChange} className={errors.firstNameNp ? "border-destructive ring-destructive/20" : "focus:bg-background transition-all"} />
                  {errors.firstNameNp && <p className="text-[10px] font-bold text-destructive">{errors.firstNameNp}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="middleNameNp" className="text-xs font-bold uppercase text-muted-foreground">MiddleName (Nepali)</Label>
                  <Input id="middleNameNp" name="middleNameNp" placeholder="राज" value={formData.middleNameNp} onChange={handleInputChange} className="focus:bg-background transition-all" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastNameNp" className={`text-xs font-bold uppercase transition-colors ${errors.lastNameNp ? "text-destructive" : "text-muted-foreground"}`}>LastName (Nepali) <span className="text-destructive">*</span></Label>
                  <Input id="lastNameNp" name="lastNameNp" placeholder="पन्त" value={formData.lastNameNp} onChange={handleInputChange} className={errors.lastNameNp ? "border-destructive ring-destructive/20" : "focus:bg-background transition-all"} />
                  {errors.lastNameNp && <p className="text-[10px] font-bold text-destructive">{errors.lastNameNp}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="mobileNumber"
                    className={`text-xs font-bold uppercase transition-colors ${errors.mobileNumber ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    Mobile Number
                  </Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={handleInputChange}
                    placeholder="9846520400"
                    className={
                      errors.mobileNumber
                        ? "border-destructive ring-destructive/20"
                        : ""
                    }
                  />
                  {errors.mobileNumber && (
                    <p className="text-[10px] font-bold text-destructive">
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="dob"
                    className={`text-xs font-bold uppercase transition-colors ${errors.dob ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    max={maxDob}
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={
                      errors.dob ? "border-destructive ring-destructive/20" : ""
                    }
                  />
                  {errors.dob && (
                    <p className="text-[10px] font-bold text-destructive">
                      {errors.dob}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Section: Documents */}
            <section className=" rounded-xl border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-1  rounded-full" />
                <h3 className="text-lg font-bold">Document Verification</h3>
              </div>
              <div className="flex items-center text-red-800 gap-2 px-4 py-2 border-l-4 border-primary rounded-r-md bg-destructive/5 mb-4">
                <p className="text-sm">
                  <span className="font-bold text-primary uppercase text-[10px] tracking-widest mr-2">Notice:</span>
                  Both **Voter ID** and **National ID** (with associated images) are <span className="font-semibold text-red-500 uppercase">required</span>. Passport is optional.
                </p>
              </div>

              {errors.idVerification && (
                <p className="text-sm font-bold text-destructive mb-4 p-3 bg-destructive/10 rounded-md">
                  {errors.idVerification}
                </p>
              )}

              <RegistrationDocumentUpload
                nationalIdNumber={formData.nIdNumber}
                onNationalIdNumberChange={handleInputChange}
                nationalIdDocument={formData.nIdDocument}
                onNationalIdDocumentChange={handleNationalIdDocumentChange}
                voterIdNumber={formData.voterIdNumber}
                onVoterIdNumberChange={handleInputChange}
                voterIdDocument={formData.voterIdDocument}
                onVoterIdDocumentChange={handleVoterIdDocumentChange}
                passportDocument={formData.passportDocument}
                onPassportDocumentChange={handlePassportDocumentChange}
                errors={errors}
              />
            </section>
          </div>

          {/* Right Column: Voting Place Selection */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 space-y-6">
              <section className="rounded-xl border p-6 shadow-sm space-y-6">
                {/* Section Header with Accent Bar */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-6 w-1 bg-primary rounded-full" />
                  <h3 className="text-lg font-bold">Voter Information</h3>
                </div>

                <div className="space-y-6">
                  {/* Ward Selection Area */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <Label className={`text-xs font-bold uppercase transition-colors ${errors.ward ? "text-destructive" : "text-muted-foreground"}`}>Select Your Ward</Label>
                      {formData.ward && (
                        <Badge variant="outline" className="text-[10px] bg-primary/5 text-primary border-primary/20 animate-in fade-in zoom-in-95">SELECTED</Badge>
                      )}
                    </div>

                    <div className={`rounded-lg border overflow-hidden transition-all bg-background ${errors.ward ? "ring-2 ring-destructive border-destructive" : "border-input shadow-sm"}`}>
                      <div className="max-h-112.5 overflow-y-auto custom-scrollbar">
                        <GeographicalDivisionPage
                          onSelectWard={onSelectWard}
                          allowAddEdit={false}
                          hideViewVotingPlaces={true}
                        />
                      </div>
                    </div>

                    {errors.ward && (
                      <p className="text-[10px] font-bold text-destructive uppercase tracking-tight">{errors.ward}</p>
                    )}
                  </div>

                  {/* Selected Summary - Refined Footer */}
                  {formData.ward && (
                    <div className="p-3 rounded-lg border border-primary/10 bg-primary/5 animate-in slide-in-from-bottom-2">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Current Selection</p>
                      <p className="text-sm font-semibold text-foreground leading-tight">Ward: {formData.ward.wardName}</p>
                    </div>
                  )}
                </div>
              </section>

              <Button
                type="submit"
                className="w-full py-8 text-lg font-bold shadow-xl shadow-primary/20 transition-all hover:shadow-primary/30 active:scale-[0.98]"
              >
                Review & Confirm
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
