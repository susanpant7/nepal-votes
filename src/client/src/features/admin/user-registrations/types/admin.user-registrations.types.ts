//domain
export interface UserRegistrationListItem {
  userRegistrationId: number;
  fullName: string;
  mobileNumber: string;
  status: string;
  requestDate: string;
  votingPlaceName: string;
}

export interface UserRegistrationDetails {
  firstName: string;
}
// requests
export interface UserRegistrationUpdate {
  userRegistrationId: number;
  reviewComment: string;
  firstName: string;
}
// responses
