import { useState } from "react";
import { Plus, UserCog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import { AdminUsersFilters } from "../components/admin-users-filters";
import { AdminUsersList } from "../components/admin-users-list";
import { useAdminUserQuery } from "../api/admin.users.query";
import type { UserFilters, UserListItem } from "../types/admin.users.types";
import { QueryWrapper } from "@/components/loading-error-wrapper/query-wrapper";
import { AdminPage, AdminPageContent, AdminPageHeader } from "@/features/admin/layout/components/admin-page-layout.tsx";
import { RestrictTo } from "@/components/auth/restrict-to.tsx";

export const AdminUsersPage = () => {
    const navigate = useNavigate();

    // appliedFilters controls the query. It's only updated when "Search" is clicked or page changes.
    const [appliedFilters, setAppliedFilters] = useState<UserFilters>({
        page: 1,
        pageSize: 20
    });

    const [hasSearched, setHasSearched] = useState(false);

    const { useUsers, useDeleteUserMutation } = useAdminUserQuery();

    // Query is only enabled after the first search
    const { data: response, isLoading, isError, refetch } = useUsers(appliedFilters, hasSearched);
    const deleteUserMutation = useDeleteUserMutation();

    const handleSearch = (filters: Omit<UserFilters, 'page' | 'pageSize'>) => {
        setAppliedFilters({
            ...filters,
            page: 1,
            pageSize: 20
        });
        setHasSearched(true);
    };


    const handlePageChange = (pageNum: number) => {
        setAppliedFilters(prev => ({ ...prev, page: pageNum }));
    };

    const handleAddUserClick = () => {
        navigate({ to: ROUTES.ADMIN_USERS_ADD });
    };

    const handleEditUser = (user: UserListItem) => {
        navigate({
            to: ROUTES.ADMIN_USERS_EDIT,
            params: { userId: user.userId.toString() }
        });
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUserMutation.mutateAsync(userId);
        } catch (error) {
            console.error("Delete failed:", error);
        }
    };

    return (
        <AdminPage>
            <AdminPageHeader
                title="User Management"
                description="Search, filter, and manage all registered users and their roles."
                icon={<UserCog className="h-8 w-8 text-primary" />}
                actions={
                    <RestrictTo>
                        <Button onClick={handleAddUserClick} size="sm" className="shadow-sm">
                            <Plus className="mr-2 h-4 w-4" /> Add New User
                        </Button>
                    </RestrictTo>
                }
            />

            <AdminPageContent>
                <div className="space-y-6 pb-6 h-full flex flex-col">
                    <AdminUsersFilters
                        onSearch={handleSearch}
                        isLoading={isLoading}
                    />

                    <div className="flex-1 overflow-hidden flex flex-col pt-0">
                        {!hasSearched ? (
                            <div className="flex-1 flex items-center justify-center bg-muted/30 border border-dashed rounded-xl">
                                <p className="text-muted-foreground">Apply filters and click Search to see results.</p>
                            </div>
                        ) : (
                            <div className="flex-1 overflow-hidden flex flex-col">
                                <QueryWrapper
                                    isLoading={isLoading}
                                    isError={isError}
                                    refetch={refetch}
                                    errorMessage="Failed to load users list."
                                >
                                    <div className="flex-1 overflow-y-auto min-h-0 border rounded-xl bg-card shadow-sm">
                                        <AdminUsersList
                                            users={response?.items || []}
                                            totalCount={response?.totalCount || 0}
                                            page={appliedFilters.page}
                                            pageSize={appliedFilters.pageSize}
                                            onPageChange={handlePageChange}
                                            onEdit={handleEditUser}
                                            onDelete={handleDeleteUser}
                                        />
                                    </div>
                                </QueryWrapper>
                            </div>
                        )}
                    </div>
                </div>
            </AdminPageContent>
        </AdminPage>
    );
};
