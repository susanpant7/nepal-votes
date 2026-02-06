import { LogOut, LogIn, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/stores/useAuthStore.ts";
import { useOverlayStore } from "@/stores/useOverlayStore.ts";
import { headerMenuItems } from "@/components/header/header.menu.items.ts";
import { AuthApi } from "@/features/auth/api/auth.api.ts";
import { ThemeTogglerButton } from "@/components/theme/theme-toggler-button.tsx";
import { ROUTES } from "@/lib/app.routes.urls.ts";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet.tsx";

export const Header = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const showOverlay = useOverlayStore((store) => store.showOverlay);
  const hideOverlay = useOverlayStore((store) => store.hideOverlay);

  const items = headerMenuItems(user);
  const isLoggedIn = user !== null;
  const navigate = useNavigate();
  const onSignOutClick = async () => {
    try {
      showOverlay();
      await AuthApi.logout();
      logout();
      await navigate({ to: "/" });
    } catch (e) {
    } finally {
      hideOverlay();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-8">
        {/* LEFT: Logo + Nav Items */}
        <div className="flex items-center gap-6 flex-1">
          {/* Mobile Menu Trigger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <SheetTitle className="text-left mb-4">Navigation</SheetTitle>
                <nav className="flex flex-col gap-2 mt-4">
                  {items.map((item) => (
                    <SheetClose asChild key={item.label}>
                      <Link
                        to={item.href}
                        activeProps={{
                          className: "bg-accent text-primary font-medium",
                        }}
                        inactiveProps={{
                          className:
                            "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        }}
                        className="flex items-center gap-3 rounded-md px-3 py-3 transition-all"
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="text-base">{item.label}</span>
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <span className="text-primary">Nepal</span>Votes
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((item) => (
              <Button asChild key={item.label} variant="ghost" size="sm">
                <Link
                  to={item.href}
                  activeProps={{
                    className:
                      "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-medium",
                  }}
                  inactiveProps={{
                    className:
                      "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800",
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
        <div className="flex items-center gap-2 md:gap-4">
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
            <Button asChild variant="default" size="sm" className="gap-2">
              <Link to={ROUTES.AUTH_SIGN_IN}>
                <LogIn className="h-4 w-4" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            </Button>
          )}

          <div className="hidden xs:block h-6 w-px bg-border mx-1" />

          {user?.userName && (
            <span className="hidden lg:inline text-sm font-medium text-muted-foreground">
              {user.userName}
            </span>
          )}

          <ThemeTogglerButton />
        </div>
      </div>
    </header>
  );
};
