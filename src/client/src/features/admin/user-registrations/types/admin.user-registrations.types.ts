//domain
export interface UserRegistrationListItem {
  userRegistrationId: number;
  fullName: string;
  mobileNumber: string;
  status: string;
  requestDate: string;
  nationalIdNumber: string;
}

export interface UserRegistrationReviewDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  dob: string;
  mobileNumber: string;
  voterIdNumber: string;
  votingPlaceFullAddress: string; // Province > District > Municipality > Ward > Voting Place Address
  reviewComment: string;

  nationalIdNumber: string;
  nationalIdDocumentContent: string;
  nationalIdDocumentContentType: string;
  nationalIdDocumentName: string;
}

// requests
export interface UserRegistrationUpdate {
  userRegistrationId: number;
  reviewComment: string;
}
// responses
