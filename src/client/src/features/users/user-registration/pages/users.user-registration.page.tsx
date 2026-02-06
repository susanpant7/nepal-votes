import { RegistrationUserDetailsForm } from "@/features/users/user-registration/components/registration-user-details-form.tsx";
import { useState } from "react";
import { RegistrationOtpForm } from "@/features/users/user-registration/components/registration-otp-form.tsx";
import { RegistrationReview } from "@/features/users/user-registration/components/registration-review.tsx";
import {
  UserDocumentType,
  type UserRegistrationForm,
} from "@/features/users/user-registration/types/users.user-registration.types.ts";
import { useUserRegistrationMutation } from "@/features/users/user-registration/api/user-registration.query.ts";

export const UserRegistrationPage = () => {
  const { submitDetails } = useUserRegistrationMutation();

  const [registrationStep, setRegistrationStep] = useState<
    "Form" | "Review" | "Otp"
  >("Form");

  const [formData, setFormData] = useState<UserRegistrationForm>({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    mobileNumber: "",
    votingPlace: null,
    nIdNumber: "",
    voterIdNumber: "",
    nIdDocument: null,
  });

  const submitUserDetails = async () => {
    const data = prepareFormData();
    await submitDetails.mutateAsync(data);
    setRegistrationStep("Otp");
  };

  const prepareFormData = () => {
    const data = new FormData();

    data.append("FirstName", formData.firstName);
    data.append("MiddleName", formData.middleName || "");
    data.append("LastName", formData.lastName);
    data.append("DateOfBirth", formData.dob);
    data.append("MobileNumber", formData.mobileNumber);
    data.append("VotingPlaceId", String(formData.votingPlace?.votingPlaceId));

    data.append("NationalIdNumber", formData.nIdNumber);
    data.append("VoterIdNumber", formData.voterIdNumber);
    data.append(
      `Documents[0].DocumentType`,
      UserDocumentType.NationalIdentity.toString(),
    );
    data.append(`Documents[0].File`, formData.nIdDocument!);

    return data;
  };

  const confirmUserDetails = () => {
    setRegistrationStep("Review");
  };
  if (registrationStep == "Form")
    return (
      <RegistrationUserDetailsForm
        formData={formData}
        setFormData={setFormData}
        confirmUserDetails={confirmUserDetails}
      />
    );
  if (registrationStep === "Review") {
    return (
      <RegistrationReview
        data={formData}
        onEdit={() => setRegistrationStep("Form")}
        onConfirm={submitUserDetails}
        isSubmitting={false}
      />
    );
  }

  return <RegistrationOtpForm mobileNumber={formData.mobileNumber} />;
};
