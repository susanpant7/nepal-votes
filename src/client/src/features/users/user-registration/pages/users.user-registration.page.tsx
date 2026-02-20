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
    firstNameNp: "",
    middleNameNp: "",
    lastNameNp: "",
    dob: "",
    mobileNumber: "",
    ward: null,
    nIdNumber: "",
    voterIdNumber: "",
    nIdDocument: null,
    voterIdDocument: null,
    passportDocument: null,
  });

  const submitUserDetails = async () => {
    const data = prepareFormData();
    await submitDetails.mutateAsync(data);
    setRegistrationStep("Otp");
  };

  const prepareFormData = () => {
    const data = new FormData();

    data.append("FirstNameEn", formData.firstName);
    data.append("MiddleNameEn", formData.middleName || "");
    data.append("LastNameEn", formData.lastName);
    data.append("FirstNameNp", formData.firstNameNp);
    data.append("MiddleNameNp", formData.middleNameNp || "");
    data.append("LastNameNp", formData.lastNameNp);
    data.append("DateOfBirth", formData.dob);
    data.append("MobileNumber", formData.mobileNumber);
    data.append("WardId", String(formData.ward?.wardId));

    data.append("NationalIdNumber", formData.nIdNumber || "");
    data.append("VoterIdNumber", formData.voterIdNumber || "");

    let docIndex = 0;
    if (formData.nIdDocument) {
      data.append(`Documents[${docIndex}].DocumentType`, UserDocumentType.NationalIdentity.toString());
      data.append(`Documents[${docIndex}].File`, formData.nIdDocument);
      docIndex++;
    }
    if (formData.voterIdDocument) {
      data.append(`Documents[${docIndex}].DocumentType`, UserDocumentType.VoterIdentity.toString());
      data.append(`Documents[${docIndex}].File`, formData.voterIdDocument);
      docIndex++;
    }
    if (formData.passportDocument) {
      data.append(`Documents[${docIndex}].DocumentType`, UserDocumentType.Passport.toString());
      data.append(`Documents[${docIndex}].File`, formData.passportDocument);
      docIndex++;
    }

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
        isSubmitting={submitDetails.isPending}
      />
    );
  }

  return <RegistrationOtpForm mobileNumber={formData.mobileNumber} />;
};
