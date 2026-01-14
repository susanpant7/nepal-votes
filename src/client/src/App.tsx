import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen.ts';
import './App.css';
import {useAuthStore} from "@/stores/useAuthStore.ts";
import {useEffect, useRef} from "react";

const router = createRouter({ routeTree });

function App() {
    const initialized = useRef(false);
    const { refreshAuth, appIsInitializing } = useAuthStore();

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;
        const initAuth = async () => {
            await refreshAuth();
        };

        initAuth();
    }, []);

    if (appIsInitializing) {
        return <div>Loading...</div>; 
    }
    return <RouterProvider router={router} />;
}

export default App;