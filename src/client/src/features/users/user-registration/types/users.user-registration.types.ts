// Use a const object instead of an enum
export const UserDocumentType = {
  CitizenshipFront: 1,
  CitizenshipBack: 2,
  Passport: 3,
  NationalIdentity: 4,
} as const;

export type UserDocumentType =
  (typeof UserDocumentType)[keyof typeof UserDocumentType];

export type DocumentCategory = "Citizenship" | "Passport" | "NationalIdentity";

export interface DocumentOption {
  label: string;
  value: DocumentCategory;
  enumIds: UserDocumentType[];
}

export const DOCUMENT_OPTIONS: DocumentOption[] = [
  {
    label: "Citizenship",
    value: "Citizenship",
    enumIds: [
      UserDocumentType.CitizenshipFront,
      UserDocumentType.CitizenshipBack,
    ],
  },
  {
    label: "Passport",
    value: "Passport",
    enumIds: [UserDocumentType.Passport],
  },
  {
    label: "National Identity",
    value: "NationalIdentity",
    enumIds: [UserDocumentType.NationalIdentity],
  },
];

export interface UserRegistrationForm {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  mobileNumber: string;
  votingPlace: { votingPlaceAddress: string; votingPlaceId: number } | null;
  documentCategory: DocumentCategory | "";
  documentFiles: Record<number, File | null>;
}

// requests
export interface DocumentUploadRequest {
  documentType: UserDocumentType;
  file: File;
}

export interface VerifyOtp {
  mobileNumber: string;
  providedOtp: string;
}
export interface RegenerateOtp {
  mobileNumber: string;
}
