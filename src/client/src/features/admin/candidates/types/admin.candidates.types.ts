//domain
export interface CandidateListItem {
  candidateId: number;
  candidateImageId: number | null;
  fullName: string;
  constituencyId: number;
  constituencyName: string;
  isIndependent: boolean;
  politicalPartyName: string | null;
  symbolContent: string; // Base64 string
  symbolContentType: string; // e.g., "image/png"
  symbolName?: string;
  imageContent?: string; // Base64 string from uploaded file
  imageContentType?: string; // e.g., "image/jpeg"
}

export interface CandidateDetail {
  candidateId: number;
  candidateImageId: number | null;
  constituencyId: number;
  constituencyName: string;
  fullName: string;
  userId: number;
  isIndependent: boolean;
  politicalPartyId: number | null;
  politicalPartyName: string | null;
  candidateSymbolId: number | null;
  symbolContent: string; // Base64 string
  symbolContentType: string; // e.g., "image/png"
  candidateSymbolFileName: string;
  symbolName?: string;
  imageContent?: string; // Base64 string from uploaded file
  imageContentType?: string; // e.g., "image/jpeg"
}
// requests
export interface AddCandidateRequest {
  userId: number;
  politicalPartyId: number | null;
  isIndependent: boolean;
  constituencyId: number;
  candidateSymbolId: number | null;
  candidateImageId?: number | null;
  imageContent?: string | null;
  imageContentType?: string | null;
  imageFileName?: string | null;
  imageFileSize?: number | null;
}
export interface UpdateCandidateRequest extends AddCandidateRequest {
  candidateId: number;
}

// responses
export interface PagedResult<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
