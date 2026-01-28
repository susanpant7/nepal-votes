export const ADMIN_CANDIDATE_ENDPOINTS = {
  GET_CANDIDATES: "/api/candidates",
  GET_CANDIDATES_BY_CONSTITUENCY_ID: (constituencyId: number) =>
    `/api/candidates?constituencyId=${constituencyId}`,
  GET_CANDIDATE_DETAIL: (candidateId: number) =>
    `/api/candidates/${candidateId}`,
  ADD_CANDIDATE: "/api/candidates",
  DELETE_CANDIDATE: (candidateId: number) => `/api/candidates/${candidateId}`,
  UPDATE_CANDIDATE: `/api/candidates/`,
} as const;
