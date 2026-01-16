import {useOverlayStore} from "@/stores/useOverlayStore.ts";
import {Loader2} from "lucide-react";
import {useEffect} from "react";

export const ScreenOverlay = () => {
    const showOverlay = useOverlayStore(store=>store.overlayVisible)
    
    useEffect(() => {
        if (showOverlay) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [showOverlay]);

    if (!showOverlay) return null;

    return (
        <div
            className="
                fixed inset-0 z-9999
                bg-background/60 backdrop-blur-sm
                flex items-center justify-center
                pointer-events-auto
            "
        >
            <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="text-sm text-muted-foreground">
                    Please wait…
                </span>
            </div>
        </div>
    );
};