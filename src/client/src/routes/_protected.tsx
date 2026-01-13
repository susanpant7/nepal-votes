import {createFileRoute, Outlet, redirect} from '@tanstack/react-router';
import {useAuthStore} from "@/stores/useAuthStore.ts";

export const Route = createFileRoute('/_protected')({
    beforeLoad: async () => {
        const user = useAuthStore.getState().user;
        if (!user) {
            throw redirect({
                to: '/',
            })
        }
    },

    component: ProtectedLayout,
});

function ProtectedLayout() {
    return (
        <div className="protected-layout flex flex-col min-h-screen">
            <div className="container mx-auto px-4 py-6">
                <Outlet />
            </div>
        </div>
    );
}
