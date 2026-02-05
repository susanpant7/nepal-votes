// Use a const object instead of an enum
export const UserDocumentType = {
  CitizenshipFront: 1,
  CitizenshipBack: 2,
  Passport: 3,
  NationalIdentity: 4,
} as const;

export type UserDocumentType =
  (typeof UserDocumentType)[keyof typeof UserDocumentType];

export type DocumentCategory = "NationalIdentity";

export interface UserRegistrationForm {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  mobileNumber: string;
  votingPlace: { votingPlaceAddress: string; votingPlaceId: number } | null;
  nIdNumber: string;
  nIdDocument: File | null;
}

// requests

export interface VerifyOtp {
  mobileNumber: string;
  providedOtp: string;
}
export interface RegenerateOtp {
  mobileNumber: string;
}
