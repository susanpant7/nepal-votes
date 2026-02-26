import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';
import './App.css';
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { useEffect, useRef } from "react";
import { useOverlayStore } from "@/stores/useOverlayStore.ts";

const router = createRouter({ routeTree });

function App() {
    const initialized = useRef(false);
    const { refreshAuth, appIsInitializing } = useAuthStore();
    const { showOverlayWithMessage, hideOverlay } = useOverlayStore();

    useEffect(() => {
        if (appIsInitializing) {
            showOverlayWithMessage("Initializing application...");
        } else {
            hideOverlay();
        }
    }, [appIsInitializing, showOverlayWithMessage, hideOverlay]);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        const initAuth = async () => {
            await refreshAuth();
        };

        initAuth();
    }, [refreshAuth]);

    return <RouterProvider router={router} />;
}

export default App;