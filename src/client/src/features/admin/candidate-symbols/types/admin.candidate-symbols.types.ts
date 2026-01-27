import type { PagedResult } from "@/types/paged-result.ts";

//domain
export interface CandidateSymbolInfo {
  candidateSymbolId: number;
  symbolContent: string; // Base64 string of byte[]
  symbolContentType: string; // MIME type like "image/png"
  symbolFileName: string;
}
export type CandidateSymbolPagedResult = PagedResult<CandidateSymbolInfo>;

// requests
export interface AddCandidateSymbolRequest {
  candidateSymbolFile: File; // browser File object
}

export interface UpdateCandidateSymbolRequest {
  candidateSymbolId: number;
  candidateSymbolFile: File;
}

// responses
