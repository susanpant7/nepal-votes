//domain
export interface ProvinceInfo {
  provinceId: number;
  provinceName: string;
}
export interface DistrictInfo {
  districtId: number;
  districtName: string;
  provinceId: number;
}

export const MunicipalityTypeMap = {
  Metropolitan: 1,
  SubMetro: 2,
  Municipality: 3,
  Rural: 4,
} as const;
export type MunicipalityType =
  (typeof MunicipalityTypeMap)[keyof typeof MunicipalityTypeMap];
export const MunicipalityTypeLabels: Record<MunicipalityType, string> = {
  [MunicipalityTypeMap.Metropolitan]: "Metropolitan City",
  [MunicipalityTypeMap.SubMetro]: "Sub-Metropolitan City",
  [MunicipalityTypeMap.Municipality]: "Municipality",
  [MunicipalityTypeMap.Rural]: "Rural Municipality",
};
export interface MunicipalityInfo {
  municipalityId: number;
  municipalityName: string;
  municipalityType: MunicipalityType;
  districtId: number;
}
export interface WardInfo {
  wardId: number;
  wardName: string;
  wardNumber: number;
  municipalityId: number;
}
export interface VotingPlaceInfo {
  votingPlaceId: number;
  votingPlaceAddress: string;
  wardId: number;
}

export interface DistrictDropdown {
  districtId: number;
  districtName: string;
}

// requests
export interface AddProvinceRequest {
  provinceName: string;
}
export interface UpdateProvinceRequest {
  provinceId: number;
  provinceName: string;
}

export interface AddDistrictRequest {
  districtName: string;
  provinceId: number;
}
export interface UpdateDistrictRequest {
  districtId: number;
  districtName: string;
  provinceId: number;
}

export interface AddMunicipalityRequest {
  municipalityName: string;
  municipalityType: MunicipalityType;
  districtId: number;
}
export interface UpdateMunicipalityRequest {
  municipalityId: number;
  municipalityName: string;
  municipalityType: MunicipalityType;
  districtId: number;
}

export interface AddWardRequest {
  wardName: string;
  wardNumber: number;
  municipalityId: number;
}
export interface UpdateWardRequest {
  wardId: number;
  wardName: string;
  wardNumber: number;
  municipalityId: number;
}

export interface AddVotingPlaceRequest {
  votingPlaceAddress: string;
  wardId: number;
}
export interface UpdateVotingPlaceRequest {
  votingPlaceId: number;
  votingPlaceAddress: string;
  wardId: number;
}

// responses
