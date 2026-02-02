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
import type { VotingPlaceInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";
import {
  DOCUMENT_OPTIONS,
  type DocumentCategory,
  type UserRegistrationForm,
} from "@/features/users/user-registration/types/users.user-registration.types.ts";
import { RegistrationDocumentUpload } from "@/features/users/user-registration/components/registration-document-upload.tsx";
import { Badge } from "lucide-react";

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
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const onSelectVotingPlace = (votingPlaceInfo: VotingPlaceInfo) => {
    const isDeselecting =
      formData.votingPlace?.votingPlaceId === votingPlaceInfo.votingPlaceId;
    setFormData((prev) => ({
      ...prev,
      votingPlace: isDeselecting ? null : votingPlaceInfo,
    }));

    if (errors.votingPlace) setErrors((prev) => ({ ...prev, votingPlace: "" }));
  };

  const handleDocCategoryChange = (category: DocumentCategory) => {
    setFormData((prev) => ({
      ...prev,
      documentCategory: category,
      documentFiles: {},
    }));
    if (errors.documents) setErrors((prev) => ({ ...prev, documents: "" }));
  };

  const handleFileChange = (id: number, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documentFiles: { ...prev.documentFiles, [id]: file },
    }));
    if (errors.documents) setErrors((prev) => ({ ...prev, documents: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit number";
    }

    if (!formData.votingPlace) {
      newErrors.votingPlace = "Please select a voting place";
    }

    if (!formData.documentCategory) {
      newErrors.documents = "Document selection is required";
    } else {
      const activeOption = DOCUMENT_OPTIONS.find(
        (o) => o.value === formData.documentCategory,
      );
      const allUploaded = activeOption?.enumIds.every(
        (id) => !!formData.documentFiles[id],
      );
      if (!allUploaded) {
        newErrors.documents = `Missing files for ${formData.documentCategory}`;
      }
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
          <div className="flex items-center gap-2 bg-muted p-1 rounded-lg px-3 py-2 border shadow-sm">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Step 1: Details
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Input Fields */}
          <div className="lg:col-span-7 space-y-8">
            {/* Section: Personal Details */}
            <section className="bg-card rounded-xl border p-6 shadow-sm space-y-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-1 bg-primary rounded-full" />
                <h3 className="text-lg font-bold">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-xs font-bold uppercase text-muted-foreground"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Janak"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={
                      errors.firstName
                        ? "border-destructive ring-destructive/20"
                        : "bg-muted/30 focus:bg-background transition-all"
                    }
                  />
                  {errors.firstName && (
                    <p className="text-[10px] font-bold text-destructive">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="middleName"
                    className="text-xs font-bold uppercase text-muted-foreground"
                  >
                    Middle Name
                  </Label>
                  <Input
                    id="middleName"
                    name="middleName"
                    placeholder="Raj"
                    value={formData.middleName}
                    onChange={handleInputChange}
                    className="bg-muted/30 focus:bg-background transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-xs font-bold uppercase text-muted-foreground"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Panta"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={
                      errors.lastName
                        ? "border-destructive ring-destructive/20"
                        : "bg-muted/30 focus:bg-background transition-all"
                    }
                  />
                  {errors.lastName && (
                    <p className="text-[10px] font-bold text-destructive">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-2">
                  <Label
                    htmlFor="mobileNumber"
                    className="text-xs font-bold uppercase text-muted-foreground"
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
                        : "bg-muted/30"
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
                    className="text-xs font-bold uppercase text-muted-foreground"
                  >
                    Date of Birth
                  </Label>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className={
                      errors.dob
                        ? "border-destructive ring-destructive/20"
                        : "bg-muted/30"
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
            <section className="bg-card rounded-xl border p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-6">
                <div className="h-6 w-1 bg-primary rounded-full" />
                <h3 className="text-lg font-bold">Document Verification</h3>
              </div>
              <RegistrationDocumentUpload
                selectedCategory={formData.documentCategory}
                onCategoryChange={handleDocCategoryChange}
                documentFiles={formData.documentFiles}
                onFileChange={handleFileChange}
                error={errors.documents}
              />
            </section>
          </div>

          {/* Right Column: Voting Place Selection */}
          <div className="lg:col-span-5">
            <div className="sticky top-10 space-y-4">
              <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-muted/20 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Voting Place</h3>
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                      Select your locality
                    </p>
                  </div>
                  {formData.votingPlace && (
                    <Badge className="bg-primary text-primary-foreground pointer-events-none">
                      SELECTED
                    </Badge>
                  )}
                </div>

                <div className="p-4 bg-background">
                  <div
                    className={`rounded-lg border overflow-hidden transition-all ${errors.votingPlace ? "ring-2 ring-destructive border-destructive" : "border-input shadow-inner"}`}
                  >
                    <div className="h-112.5 overflow-y-auto custom-scrollbar">
                      <GeographicalDivisionPage
                        onSelectVotingPlace={onSelectVotingPlace}
                        allowAddEdit={false}
                      />
                    </div>
                  </div>

                  {errors.votingPlace && (
                    <p className="mt-2 text-[10px] font-bold text-destructive uppercase tracking-tighter">
                      {errors.votingPlace}
                    </p>
                  )}
                </div>

                {formData.votingPlace && (
                  <div className="p-4 bg-primary/5 border-t">
                    <p className="text-xs font-bold text-primary uppercase">
                      Current Selection:
                    </p>
                    <p className="text-sm font-semibold truncate">
                      {formData.votingPlace.votingPlaceAddress}
                    </p>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full py-6 text-lg font-bold shadow-xl shadow-primary/20 transition-all active:scale-[0.98]"
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
