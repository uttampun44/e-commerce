import { render } from '@testing-library/react';
import Login from '../login';
import { BrowserRouter } from 'react-router';
import { AuthContextProvider } from '@/contextapi/auth';
import { ClerkProvider } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || 'pk_test_dummy';

  const queryClient = new QueryClient();

if (!clerkPublishableKey) {
  throw new Error('CLERK_PUBLISHABLE_KEY is not defined');
}
const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <ClerkProvider publishableKey={clerkPublishableKey}>
     <QueryClientProvider client={ queryClient }>
        <BrowserRouter>
        <AuthContextProvider>
          {component}
        </AuthContextProvider>
      </BrowserRouter>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

describe('Login Page', () => {
  it('should render login component without crashing', () => {
    const { container } = renderWithProviders(<Login />);
    expect(container).toBeTruthy();
  });
});
