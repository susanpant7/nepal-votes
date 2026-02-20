//domain
export interface UserRegistrationListItem {
  userRegistrationId: number;
  fullName: string;
  mobileNumber: string;
  status: string;
  requestDate: string;
  nationalIdNumber: string;
  voterIdNumber: string;
}

export interface UserRegistrationReviewDetails {
  firstName: string;
  middleName?: string;
  lastName: string;
  firstNameNp: string;
  middleNameNp?: string;
  lastNameNp: string;
  dob: string;
  mobileNumber: string;
  voterIdNumber: string;
  nationalIdNumber: string;
  wardFullAddress: string;
  reviewComment: string;
  documents: DocumentReviewDetail[];
}

export interface DocumentReviewDetail {
  documentType: number;
  content: string;
  contentType: string;
  fileName: string;
}

// requests
export interface UserRegistrationUpdate {
  userRegistrationId: number;
  reviewComment: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface UserRegistrationSearchQuery {
  districtId?: number;
  searchTerm?: string;
  pageNumber?: number;
  pageSize?: number;
}
// responses
