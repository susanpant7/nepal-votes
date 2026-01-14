import { LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { getNavItems } from "./nav-config";
import {Link, useNavigate} from "@tanstack/react-router";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import AuthApi from "@/routes/auth/-api/auth-api.ts";
import {useOverlayStore} from "@/stores/useOverlayStore.ts";

export default function Header() {
    const user = useAuthStore((state) => state.user)
    const logout = useAuthStore((state) => state.logout)
    const showOverlay = useOverlayStore(store=>store.showOverlay)
    const hideOverlay = useOverlayStore(store=>store.hideOverlay)
    
    const items = getNavItems(user)
    const isLoggedIn = user !== null
    const navigate = useNavigate()
    const onSignOutClick = async () => {
        try {
            showOverlay()
            await AuthApi.logout();
            logout();
            await navigate({to:'/'})
        } catch (e) {
            
        } finally {
            hideOverlay()
        }
    }
    
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="flex h-16 items-center px-4 md:px-8">

                {/* LEFT: Logo + Nav Items */}
                <div className="flex items-center gap-6 flex-1">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                        <span className="text-primary">Nepal</span>Votes
                    </div>

                    {/* Desktop Nav: Shown next to logo */}
                    <nav className="hidden md:flex items-center gap-1">
                        {items.map((item) => (
                            <Button asChild key={item.label} variant="ghost" size="sm">
                                <Link
                                    to={item.href}
                                    activeProps={{
                                        className: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium"
                                    }}
                                    inactiveProps={{
                                        className: "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                    }}
                                    className="flex items-center gap-2 rounded-md px-3 py-2 transition-all"
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            </Button>
                        ))}
                    </nav>
                </div>

                {/* RIGHT: Login/Logout + Theme */}
                <div className="flex items-center gap-4">
                    {isLoggedIn ? (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onSignOutClick}
                            className="gap-2"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden sm:inline">Sign Out</span>
                        </Button>
                    ) : (
                        /* Use asChild to merge the Link and Button behaviors */
                        <Button asChild variant="default" size="sm" className="gap-2">
                            <Link to="/auth">
                                <LogIn className="h-4 w-4" />
                                <span className="hidden sm:inline">Sign In</span>
                            </Link>
                        </Button>
                    )}

                    <div className="h-6 w-px bg-border mx-2" /> {/* Subtle Divider */}
                    {user?.userName}
                    <ModeToggle />
                </div>

            </div>
        </header>
    );
}