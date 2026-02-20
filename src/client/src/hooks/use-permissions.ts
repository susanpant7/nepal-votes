import { useAuthStore } from "@/stores/useAuthStore";
import { RoleNames } from "@/features/auth/constants/auth.constants";

export const usePermissions = () => {
    const { user } = useAuthStore();

    const roles = user?.role || [];

    const isSuperAdmin = roles.includes(RoleNames.SUPER_ADMIN);
    const isAdmin = roles.includes(RoleNames.ADMIN) || isSuperAdmin;

    const canPerformAction = () => {
        return isSuperAdmin;
    };

    return {
        roles,
        isSuperAdmin,
        isAdmin,
        canPerformAction,
    };
};
