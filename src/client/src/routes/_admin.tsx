import {createFileRoute, redirect} from '@tanstack/react-router'
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {AdminLayout} from "@/features/admin/layout/admin-layout.tsx";

export const Route = createFileRoute('/_admin')({
    beforeLoad: async () => {
        const user = useAuthStore.getState().user;
        if (!user) {
            throw redirect({
                to: '/',
            })
        }
    },
    component: AdminLayout,
})