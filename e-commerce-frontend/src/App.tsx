import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import { AppRoutes } from '@/routes/Approutes'
import {Toaster} from 'sonner'

function App() {

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRoutes />
        <Toaster 
        position='top-right'
        richColors
        />
      </QueryClientProvider>
    </>
  )
}

export default App
