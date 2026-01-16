import {useSidebar} from "@/components/ui/sidebar.tsx";
import {PanelLeftClose, PanelLeftOpen} from "lucide-react";

export const ShowHideSidebarButton = () => {
    const { toggleSidebar, state } = useSidebar()

    return (
        <div
            onClick={toggleSidebar}
            className="pt-1 fixed cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg flex items-center justify-center group"
        >
            {state === "expanded" ? (
                <PanelLeftClose size={28} strokeWidth={1.5} className="group-hover:text-blue-600 transition-colors" />
            ) : (
                <PanelLeftOpen size={28} strokeWidth={1.5} className="group-hover:text-blue-600 transition-colors" />
            )}
            <span className="sr-only">Toggle Sidebar</span>
        </div>
        
    )
};