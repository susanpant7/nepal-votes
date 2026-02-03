//domain
import type { DocumentCategory } from "@/features/users/user-registration/types/users.user-registration.types.ts";

export interface UserRegistrationListItem {
  userRegistrationId: number;
  fullName: string;
  mobileNumber: string;
  status: string;
  requestDate: string;
  votingPlaceName: string;
}

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

export interface UserRegistrationReviewDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  mobileNumber: string;
  votingPlaceFullAddress: string; // Province > District > Municipality > Ward > Voting Place Address
  reviewComment: string;
  reviewDocuments: UserRegistrationReviewDocumentDetails[];
}

export interface UserRegistrationReviewDocumentDetails {
  documentContent: string;
  documentContentType: string;
  documentName: string;
}

// requests
export interface UserRegistrationUpdate {
  userRegistrationId: number;
  reviewComment: string;
  firstName: string;
}
// responses
