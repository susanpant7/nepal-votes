export const ADMIN_POLITICAL_PARTY_ENDPOINTS = {
    GET_POLITICAL_PARTIES: '/api/political-parties',
    GET_POLITICAL_PARTY_BY_ID: (id:number) => `/api/political-parties/${id}` ,
} as const;