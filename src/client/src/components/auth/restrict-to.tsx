import React, { type ReactNode } from 'react';
import { usePermissions } from '@/hooks/use-permissions';

interface RestrictToProps {
    children: ReactNode;
    fallback?: ReactNode;
    role?: string | string[];
}

/**
 * A component that conditionally renders its children based on the user's role.
 * By default, it checks if the user has the 'SUPER_ADMIN' role.
 */
export const RestrictTo: React.FC<RestrictToProps> = ({
    children,
    fallback = null,
    role
}) => {
    const { roles, isSuperAdmin } = usePermissions();

    let hasPermission = false;

    if (role) {
        const requiredRoles = Array.isArray(role) ? role : [role];
        hasPermission = requiredRoles.some(r => roles.includes(r));
    } else {
        // Default behavior: only SUPER_ADMIN can see the content
        hasPermission = isSuperAdmin;
    }

    if (!hasPermission) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
};
