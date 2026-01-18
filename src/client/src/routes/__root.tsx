import * as React from "react";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner.tsx";
import { Header } from "@/components/header/header.tsx";
import { NotFoundPage } from "@/features/errors/pages/error.not-found.page.tsx";
import { ErrorFallbackPage } from "@/features/errors/pages/error.fallback.page.tsx";

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundPage,
  errorComponent: ErrorFallbackPage,
});

function RootComponent() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/admin");
  return (
    <React.Fragment>
      <Toaster richColors closeButton position="top-right" />
      {!hideHeader && <Header />}
      <main>
        <Outlet />
      </main>
    </React.Fragment>
  );
}
