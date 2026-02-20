import AddUserForm from "../components/add-user.form";
import { usePermissions } from "@/hooks/use-permissions.ts";
import { Navigate } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";

const AdminUsersPageAdd = () => {
    const { isSuperAdmin } = usePermissions();

    if (!isSuperAdmin) {
        return <Navigate to={ROUTES.ADMIN_DASHBOARD} />;
    }

    return (
        <AddUserForm />
    );
};

export default AdminUsersPageAdd;
