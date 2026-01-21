import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import SeasonProvider from '../contexts/SeasonProvider';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false, staleTime: 0, gcTime: 0 },
    },
  });

export function renderWithProviders(
  ui: React.ReactElement,
  path: string = '/'
) {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[path]}>
        <SeasonProvider>{ui}</SeasonProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
}
