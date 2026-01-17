export const ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS = {
    GET_PROVINCES: '/api/provinces',
    ADD_PROVINCE: '/api/provinces',
    UPDATE_PROVINCE: (provinceId: number) => `/api/provinces/${provinceId}`,
    
    GET_DISTRICTS_BY_PROVINCE_ID: (provinceId:number) => `/api/districts?provinceId=${provinceId}`,
    ADD_DISTRICT: '/api/districts',
    UPDATE_DISTRICT: (districtId: number) => `/api/districts/${districtId}`,
    
    GET_MUNICIPALITIES_BY_DISTRICT_ID: (districtId:number) => `/api/municipalities?districtId=${districtId}`,
    ADD_MUNICIPALITY: '/api/municipalities',
    UPDATE_MUNICIPALITY: (municipalityId: number) => `/api/municipalities/${municipalityId}`,
    
    GET_WARDS_BY_MUNICIPALITY_ID:(municipalityId:number) => `/api/wards?municipalityId=${municipalityId}`,
    ADD_WARD: '/api/wards',
    UPDATE_WARD: (wardId: number) => `/api/wards/${wardId}`,
    
    GET_VOTING_PLACES_BY_WARDS_ID: (wardId:number) => `/api/voting-places?wardId=${wardId}`,
    ADD_VOTING_PLACE: '/api/voting-places',
    UPDATE_VOTING_PLACE: (votingPlaceId: number) => `/api/voting-places/${votingPlaceId}`,
} as const;