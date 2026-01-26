export const ADMIN_ELECTORAL_CONSTITUENCIES_ENDPOINTS = {
  // GET_ELECTORAL_CONSTITUENCIES: "/api/constituencies",
  GET_ELECTORAL_CONSTITUENCIES_DROPDOWN: "/api/constituencies/dropdown",
  GET_ELECTORAL_CONSTITUENCIES_LIST_ITEMS_BY_DISTRICT_ID: (
    districtId: number,
  ) => `/api/constituencies/list-item?districtId=${districtId}`,
  GET_ELECTORAL_CONSTITUENCY_BY_CONSTITUENCY_ID: (constituencyId: number) =>
    `/api/constituencies/${constituencyId}`,
  GET_WARD_ASSIGNMENTS_BY_MUNICIPALITY_ID: (municipalityId: number) =>
    `/api/constituencies/ward-assignments?municipalityId=${municipalityId}`,
  ADD_ELECTORAL_CONSTITUENCIES: "/api/constituencies",
  EDIT_ELECTORAL_CONSTITUENCIES: "/api/constituencies",
  REASSIGN_WARD: "/api/constituencies/reassign-ward",
  GET_UNASSIGNED_WARDS: "/api/constituencies/unassigned-wards",
} as const;
