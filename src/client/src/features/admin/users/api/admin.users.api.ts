import { apiClient } from "@/api/api.client";
import { ADMIN_USER_ENDPOINTS } from "./admin.users.endpoints";
import type { AddUserRequest, RoleInfo, UserFilters, UserListItem, UserListResponse } from "../types/admin.users.types";

export const adminUsersApi = {
    getRoles: async (): Promise<RoleInfo[]> => {
        return await apiClient.get(ADMIN_USER_ENDPOINTS.GET_ROLES);
    },

    getUsers: async (filters: UserFilters): Promise<UserListResponse> => {
        // Map camelCase (frontend) to PascalCase (backend search request) for reliable binding
        const request = {
            UserId: filters.userId,
            MobileNumber: filters.mobileNumber,
            NationalId: filters.nationalId,
            VoterId: filters.voterId,
            ProvinceId: filters.provinceId,
            DistrictId: filters.districtId,
            MunicipalityId: filters.municipalityId,
            Role: filters.role,
            RoleId: filters.roleId,
            Status: filters.status,
            Page: filters.page,
            PageSize: filters.pageSize,
        };
        return await apiClient.post(ADMIN_USER_ENDPOINTS.SEARCH_USERS, request);
    },

    getUser: async (userId: number): Promise<UserListItem> => {
        return await apiClient.get(`${ADMIN_USER_ENDPOINTS.LIST_USERS}/${userId}`);
    },

    addUser: async (user: AddUserRequest) => {
        const formData = new FormData();
        formData.append("FirstNameEn", user.firstNameEn);
        formData.append("MiddleNameEn", user.middleNameEn || "");
        formData.append("LastNameEn", user.lastNameEn);
        formData.append("FirstNameNp", user.firstNameNp);
        formData.append("MiddleNameNp", user.middleNameNp || "");
        formData.append("LastNameNp", user.lastNameNp);
        formData.append("DateOfBirth", user.dateOfBirth);
        formData.append("MobileNumber", user.mobileNumber);
        formData.append("NationalIdNumber", user.nationalIdNumber);
        formData.append("VoterIdNumber", user.voterIdNumber);
        formData.append("WardId", user.wardId.toString());

        user.roles.forEach((role) => {
            formData.append("Roles", role);
        });

        if (user.nationalIdCardFile && typeof user.nationalIdCardFile !== "string") {
            formData.append("NationalIdCardFile", user.nationalIdCardFile);
        }
        if (user.voterCardFile && typeof user.voterCardFile !== "string") {
            formData.append("VoterCardFile", user.voterCardFile);
        }
        if (user.passportFile && typeof user.passportFile !== "string") {
            formData.append("PassportFile", user.passportFile);
        }

        return await apiClient.post(ADMIN_USER_ENDPOINTS.ADD_USER, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    updateUser: async (userId: number, user: AddUserRequest) => {
        const formData = new FormData();
        formData.append("FirstNameEn", user.firstNameEn);
        formData.append("MiddleNameEn", user.middleNameEn || "");
        formData.append("LastNameEn", user.lastNameEn);
        formData.append("FirstNameNp", user.firstNameNp);
        formData.append("MiddleNameNp", user.middleNameNp || "");
        formData.append("LastNameNp", user.lastNameNp);
        formData.append("DateOfBirth", user.dateOfBirth);
        formData.append("MobileNumber", user.mobileNumber);
        formData.append("NationalIdNumber", user.nationalIdNumber);
        formData.append("VoterIdNumber", user.voterIdNumber);
        formData.append("WardId", user.wardId.toString());

        user.roles.forEach((role) => {
            formData.append("Roles", role);
        });

        if (user.nationalIdCardFile && typeof user.nationalIdCardFile !== "string") {
            formData.append("NationalIdCardFile", user.nationalIdCardFile);
        }
        if (user.voterCardFile && typeof user.voterCardFile !== "string") {
            formData.append("VoterCardFile", user.voterCardFile);
        }
        if (user.passportFile && typeof user.passportFile !== "string") {
            formData.append("PassportFile", user.passportFile);
        }

        return await apiClient.put(`${ADMIN_USER_ENDPOINTS.UPDATE_USER}/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    deleteUser: async (userId: number) => {
        return await apiClient.delete(`${ADMIN_USER_ENDPOINTS.DELETE_USER}/${userId}`);
    },
};
