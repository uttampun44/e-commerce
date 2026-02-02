import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { AppRoutes } from '@/routes/Approutes'
import {Toaster} from 'sonner'
import { CombineContextProvider } from '@/contextapi/combineContext'
import { ClerkProvider } from '@clerk/clerk-react'

function App() {

  const queryClient = new QueryClient();

   const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

  if (!PUBLISHABLE_KEY) {
    throw new Error('Add your Clerk Publishable Key to the .env file')
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryClient}>
        <CombineContextProvider>
          <AppRoutes />
          <Toaster position="top-right" richColors />
        </CombineContextProvider>
      </QueryClientProvider>
    </ClerkProvider>
  )
}

export default App
