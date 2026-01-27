export const ADMIN_CANDIDATE_SYMBOL_ENDPOINTS = {
  GET_CANDIDATE_SYMBOLS: (pageNumber: number, pageSize: number) =>
    `/api/candidate-symbols?pageNumber=${pageNumber}&pageSize=${pageSize}`,

  ADD_CANDIDATE_SYMBOL: "/api/candidate-symbols",

  UPDATE_CANDIDATE_SYMBOL: "/api/candidate-symbols",

  DELETE_CANDIDATE_SYMBOL: (candidateSymbolId: number) =>
    `/api/candidate-symbols/${candidateSymbolId}`,
} as const;
