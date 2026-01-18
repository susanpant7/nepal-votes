export const ADMIN_ELECTORAL_GEOGRAPHY_ENDPOINTS = {
    GET_PROVINCES: '/api/provinces',
    ADD_PROVINCE: '/api/provinces',
    DELETE_PROVINCE: (provinceId: number) => `/api/provinces/${provinceId}`,
    UPDATE_PROVINCE: (provinceId: number) => `/api/provinces/${provinceId}`,
    
    GET_DISTRICTS_BY_PROVINCE_ID: (provinceId:number) => `/api/districts?provinceId=${provinceId}`,
    ADD_DISTRICT: '/api/districts',
    DELETE_DISTRICT: (districtId: number) => `/api/districts/${districtId}`,
    UPDATE_DISTRICT: (districtId: number) => `/api/districts/${districtId}`,
    
    GET_MUNICIPALITIES_BY_DISTRICT_ID: (districtId:number) => `/api/municipalities?districtId=${districtId}`,
    ADD_MUNICIPALITY: '/api/municipalities',
    DELETE_MUNICIPALITY: (municipalityId: number) => `/api/municipalities/${municipalityId}`,
    UPDATE_MUNICIPALITY: (municipalityId: number) => `/api/municipalities/${municipalityId}`,
    
    GET_WARDS_BY_MUNICIPALITY_ID:(municipalityId:number) => `/api/wards?municipalityId=${municipalityId}`,
    ADD_WARD: '/api/wards',
    DELETE_WARD: (wardId: number) => `/api/wards/${wardId}`,
    UPDATE_WARD: (wardId: number) => `/api/wards/${wardId}`,
    
    GET_VOTING_PLACES_BY_WARDS_ID: (wardId:number) => `/api/voting-places?wardId=${wardId}`,
    ADD_VOTING_PLACE: '/api/voting-places',
    DELETE_VOTING_PLACE: (votingPlaceId: number) => `/api/voting-places/${votingPlaceId}`,
    UPDATE_VOTING_PLACE: (votingPlaceId: number) => `/api/voting-places/${votingPlaceId}`,
} as const;