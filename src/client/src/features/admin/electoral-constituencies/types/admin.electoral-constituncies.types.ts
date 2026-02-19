//domain

export interface ConstituencyDropdown {
  constituencyId: number;
  constituencyName: string;
}

// lightweight item returned by /api/constituencies/all-with-location
// used by candidate filter dropdowns
export interface ConstituencyFilterItem {
  constituencyId: number;
  constituencyName: string;
  districtId: number;
  provinceId: number;
}

export interface WardWithConstituencyDetails {
  wardId: number;
  wardNumber: number;
  wardName: string;
  constituencyId: number;
  constituencyName: string;
}

export interface MunicipalityWithWardsDetails {
  municipalityId: number;
  municipalityName: string;
  wards: WardWithConstituencyDetails[];
}

export interface DistrictWithMunicipalitiesDetails {
  districtId: number;
  districtName: string;
  municipalities: MunicipalityWithWardsDetails[];
}

export interface ProvinceWithDistrictsDetails {
  provinceId: number;
  provinceName: string;
  districts: DistrictWithMunicipalitiesDetails[];
}

// for constituency list page
export interface ConstituencyListItem {
  constituencyId: number;
  constituencyName: string;
  provinceId: number;
  districtId: number;
  totalWards: number;
  municipalityNameAndWardNumbers: MunicipalityNameAndWardNumbers[];
}
export interface MunicipalityNameAndWardNumbers {
  municipalityName: string;
  wardNumbers: string;
}
export interface MunicipalityWithWardsInfo {
  municipalityId: number;
  municipalityName: string;
  wardNameAndNumbers: WardNameAndNumber[];
}
export interface WardNameAndNumber {
  wardId: number;
  wardNumber: number;
  wardName: string;
}
// for constituency list page

// for constituency add/edit page
export interface ConstituencyDetail {
  constituencyId: number;
  constituencyName: string;
  provinceId: number;
  provinceName: string;
  districtId: number;
  districtName: string;
  municipalityWardInfos: MunicipalityWardInfo[];
}

export interface MunicipalityWardInfo {
  municipalityId: number;
  municipalityName: string;
  wardIdNumbers: WardIdNumber[];
}

export interface WardIdNumber {
  wardId: number;
  wardNumber: number;
}

export interface WardWithConstituency {
  wardId: number;
  wardNumber: number;
  assignedConstituencyId?: number | null;
  assignedConstituencyName?: string | null;
}

// for constituency add/edit page

// requests
export interface AddConstituencyRequest {
  constituencyName: string;
  wardIds: number[] | null;
}
export interface EditConstituencyRequest {
  constituencyId: number;
  constituencyName: string;
  wardIds: number[] | null;
}

export interface ReassignWardRequest {
  wardId: number;
  constituencyId: number;
  municipalityId: number; // to invalidate the ward assignments by municipality id
}

// responses
