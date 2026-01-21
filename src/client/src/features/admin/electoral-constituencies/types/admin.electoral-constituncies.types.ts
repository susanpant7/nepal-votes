//domain
export interface ConstituencyInfo {
  constituencyId: number;
  constituencyName: string;
  provinceId: number;
  districtId: number;
  municipalityId: number;
  wardIds: number[];
}

// requests
export interface AddConstituencyRequest {
  constituencyName: string;
  wardIds: number[];
}
export interface EditConstituencyRequest {
  constituencyId: number;
  constituencyName: string;
  wardIds: number[];
}
// responses
