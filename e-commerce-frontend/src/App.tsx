import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { AppRoutes } from '@/routes/Approutes'
import {Toaster} from 'sonner'
import { CombineContextProvider } from '@/contextapi/combineContext'

function App() {

  const queryClient = new QueryClient();

  return (
    <CombineContextProvider>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <Toaster 
        position='top-right'
        richColors
        />
      </QueryClientProvider>
    </CombineContextProvider>
  )
}

export default App
