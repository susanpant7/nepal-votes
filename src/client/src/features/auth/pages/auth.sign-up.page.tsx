import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label.tsx";
import { Button } from "@/components/ui/button.tsx";
import { type ChangeEvent, type FormEvent, useState } from "react";
import { GeographicalDivisionPage } from "@/features/admin/electoral-geographies/components/geographical-division-page.tsx";
import type { VotingPlaceInfo } from "@/features/admin/electoral-geographies/types/admin.electoral-geographies.types.ts";

export const AuthSignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    mobileNumber: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [selectedVotingPlace, setSelectedVotingPlace] =
    useState<VotingPlaceInfo | null>(null);

  const onSelectVotingPlace = (votingPlaceInfo: VotingPlaceInfo) => {
    if (selectedVotingPlace?.votingPlaceId == votingPlaceInfo.votingPlaceId) {
      setSelectedVotingPlace(null);
    } else {
      setSelectedVotingPlace(votingPlaceInfo);
    }
  };
  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    // 10-digit validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted Successfully:", formData);
      alert("Form submitted!");
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl p-8 space-y-8 bg-card border rounded-xl shadow-sm"
    >
      {/* Header Section */}
      <div className="space-y-1 border-b pb-4">
        <h2 className="text-2xl font-bold tracking-tight">User Registration</h2>
        <p className="text-sm text-muted-foreground">
          Please enter your details and select your voting location.
        </p>
      </div>

      <div className="space-y-6">
        {/* Names Grid: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="text-sm font-medium">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Susan"
              className={
                errors.firstName
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.firstName && (
              <p className="text-[10px] font-medium text-destructive">
                {errors.firstName}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="middleName" className="text-sm font-medium">
              Middle Name
            </Label>
            <Input
              id="middleName"
              name="middleName"
              value={formData.middleName}
              onChange={handleInputChange}
              placeholder="(Optional)"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName" className="text-sm font-medium">
              Last Name
            </Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Pant"
              className={
                errors.lastName
                  ? "border-destructive focus-visible:ring-destructive"
                  : ""
              }
            />
            {errors.lastName && (
              <p className="text-[10px] font-medium text-destructive">
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Mobile Number - Half Width */}
        <div className="space-y-2 md:w-1/2">
          <Label htmlFor="mobileNumber" className="text-sm font-medium">
            Mobile Number
          </Label>
          <Input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            placeholder="1234567890"
            className={
              errors.mobileNumber
                ? "border-destructive focus-visible:ring-destructive"
                : ""
            }
          />
          {errors.mobileNumber && (
            <p className="text-[10px] font-medium text-destructive">
              {errors.mobileNumber}
            </p>
          )}
        </div>

        {/* Voting Place */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <Label htmlFor="votingPlace" className="text-sm font-medium">
              Voting Place Selection
            </Label>
            {selectedVotingPlace && (
              <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                {selectedVotingPlace.votingPlaceAddress}
              </span>
            )}
          </div>

          <div className="border rounded-md bg-muted/5 overflow-hidden">
            <div className="h-75 overflow-y-auto p-4 custom-scrollbar">
              <GeographicalDivisionPage
                allowAddEdit={false}
                onSelectVotingPlace={onSelectVotingPlace}
              />
            </div>
          </div>

          {errors.votingPlace && (
            <p className="text-[10px] font-medium text-destructive">
              {errors.votingPlace}
            </p>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end pt-4 border-t">
        <Button
          type="submit"
          className="w-full md:w-40 shadow-md transition-all active:scale-95"
        >
          Save Registration
        </Button>
      </div>
    </form>
  );
};
