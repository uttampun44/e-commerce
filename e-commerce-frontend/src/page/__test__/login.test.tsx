import { render } from '@testing-library/react';
import Login from '@/page/login';
import { BrowserRouter } from 'react-router';
import { AuthContextProvider } from '@/contextapi/auth';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthContextProvider>
          {component}
        </AuthContextProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('Login Page', () => {
  it('should render login component without crashing', () => {
    const { container } = renderWithProviders(<Login />);
    expect(container).toBeTruthy();
  });
});
