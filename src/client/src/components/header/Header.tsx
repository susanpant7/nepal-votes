import { LogOut, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { getNavItems } from "./nav-config";
import {Link} from "@tanstack/react-router";
import {useAuthStore} from "@/stores/useAuthStore.ts";
import AuthApi from "@/routes/auth/-api/auth-api.ts";

export default function Header() {
    const user = useAuthStore((state) => state.user)

    const items = getNavItems(user)
    const isLoggedIn = user !== null
    const onSignOutClick = async () => {
        await AuthApi.logout();
        useAuthStore.getState().logout()
    }
    
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            {/* Remove 'container' and use 'px-4' or 'px-6' for better control */}
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
                                <Link to={item.href} className="flex items-center gap-2">
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