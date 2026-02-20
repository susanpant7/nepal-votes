import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminUsersApi } from "./admin.users.api";
import type { AddUserRequest, UserFilters } from "../types/admin.users.types";

export const useAdminUserQuery = () => {
    const queryClient = useQueryClient();

    const useRoles = () =>
        useQuery({
            queryKey: ["admin", "users", "roles"],
            queryFn: () => adminUsersApi.getRoles(),
        });

    const useUsers = (filters: UserFilters, enabled: boolean = true) =>
        useQuery({
            queryKey: ["admin", "users", "list", filters],
            queryFn: () => adminUsersApi.getUsers(filters),
            enabled: enabled,
        });

    const useUser = (userId: number) =>
        useQuery({
            queryKey: ["admin", "users", "detail", userId],
            queryFn: () => adminUsersApi.getUser(userId),
            enabled: !!userId,
        });

    const useAddUserMutation = () =>
        useMutation({
            mutationFn: (user: AddUserRequest) => adminUsersApi.addUser(user),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["admin", "users", "list"] });
            },
        });

    const useUpdateUserMutation = () =>
        useMutation({
            mutationFn: ({ userId, user }: { userId: number; user: AddUserRequest }) =>
                adminUsersApi.updateUser(userId, user),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["admin", "users", "list"] });
            },
        });

    const useDeleteUserMutation = () =>
        useMutation({
            mutationFn: (userId: number) => adminUsersApi.deleteUser(userId),
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["admin", "users", "list"] });
            },
        });

    return {
        useRoles,
        useUsers,
        useUser,
        useAddUserMutation,
        useUpdateUserMutation,
        useDeleteUserMutation,
    };
};
