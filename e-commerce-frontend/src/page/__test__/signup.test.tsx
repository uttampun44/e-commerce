import { render } from '@testing-library/react';
import Signup from '@/page/signup';
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
}

describe('Signup Page', () => {
  it('should render signup component without crashing', () => {
    const { container } = renderWithProviders(<Signup />);
    expect(container).toBeTruthy();
  });
});