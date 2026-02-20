export interface AddUserRequest {
    firstNameEn: string;
    middleNameEn?: string;
    lastNameEn: string;
    firstNameNp: string;
    middleNameNp?: string;
    lastNameNp: string;
    dateOfBirth: string;
    mobileNumber: string;
    nationalIdNumber: string;
    voterIdNumber: string;
    wardId: number;
    roles: string[];
    status?: string;
    nationalIdCardFile: File | null;
    voterCardFile: File | null;
    passportFile: File | null;
}

export interface RoleInfo {
    roleId: number;
    roleName: string;
}

export interface UserListItem {
    userId: number;
    firstNameEn: string;
    middleNameEn?: string;
    lastNameEn: string;
    firstNameNp: string;
    middleNameNp?: string;
    lastNameNp: string;
    fullNameEn: string;
    fullNameNp: string;
    mobileNumber: string;
    nationalIdNumber: string;
    voterIdNumber: string;
    dateOfBirth: string;
    age: number;
    wardId: number;
    wardName?: string;
    wardNumber?: number;
    municipalityName?: string;
    districtName?: string;
    provinceName?: string;
    roles: string[];
    status: string;
    requestDate: string;
}

export interface UserFilters {
    userId?: number;
    mobileNumber?: string;
    nationalId?: string;
    voterId?: string;
    provinceId?: number;
    districtId?: number;
    municipalityId?: number;
    role?: string;
    roleId?: number;
    status?: string;
    page: number;
    pageSize: number;
}

export interface UserListResponse {
    items: UserListItem[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
