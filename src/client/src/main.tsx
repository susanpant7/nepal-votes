import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // This disables retries for all useQuery hooks in your app
            retry: false,

            // Optional: You might also want to disable refetching 
            // when you switch browser tabs during debugging
            refetchOnWindowFocus: false,
        },
    },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
      </ThemeProvider>
  </StrictMode>,
)
