export const ADMIN_POLITICAL_PARTY_ENDPOINTS = {
    GET_POLITICAL_PARTIES: '/api/political-parties',
    GET_POLITICAL_PARTY_BY_ID: (id:number) => `/api/political-parties/${id}`,
    ADD_POLITICAL_PARTY: '/api/political-parties',
    EDIT_POLITICAL_PARTY: '/api/political-parties',
} as const;