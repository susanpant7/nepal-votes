// Use a const object instead of an enum
export const UserDocumentType = {
  CitizenshipFront: 1,
  CitizenshipBack: 2,
  Passport: 3,
  NationalIdentity: 4,
  VoterIdentity: 5,
} as const;

export type UserDocumentType =
  (typeof UserDocumentType)[keyof typeof UserDocumentType];

export type DocumentCategory = "NationalIdentity" | "VoterIdentity" | "Passport";

export interface UserRegistrationForm {
  firstName: string;
  middleName?: string;
  lastName: string;
  firstNameNp: string;
  middleNameNp?: string;
  lastNameNp: string;
  dob: string;
  mobileNumber: string;
  voterIdNumber: string;
  ward: { wardName: string; wardId: number } | null;
  nIdNumber: string;
  nIdDocument: File | null;
  voterIdDocument: File | null;
  passportDocument: File | null;
}

// requests

export interface VerifyOtp {
  mobileNumber: string;
  providedOtp: string;
}
export interface RegenerateOtp {
  mobileNumber: string;
}
