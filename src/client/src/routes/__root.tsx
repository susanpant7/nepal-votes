import * as React from 'react'
import {Outlet, createRootRoute, useLocation} from '@tanstack/react-router'
import Header from "@/components/header/Header.tsx";
import {Toaster} from "@/components/ui/sonner.tsx";
import NotFoundPage from "@/components/NotFoundPage.tsx";

export const Route = createRootRoute({
    component: RootComponent,
    notFoundComponent: NotFoundPage
})

function RootComponent() {
    const location = useLocation();
    const hideHeader = location.pathname.startsWith("/admin")
  return (
      <React.Fragment>
          <Toaster richColors closeButton position="top-right" />
          {!hideHeader && <Header />}
          <main >
              <Outlet />
          </main>
      </React.Fragment>
  )
}
