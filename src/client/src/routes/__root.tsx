import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import Header from "@/components/header/Header.tsx";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
      <React.Fragment>
          <Header />
          <main className="flex-1 px-4 py-2 md:px-8 md:py-4 lg:px-12 lg:py-6">
              <div className="mx-auto max-w-7xl w-full">
                  <Outlet />
              </div>
          </main>
      </React.Fragment>
  )
}
