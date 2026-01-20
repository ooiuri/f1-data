import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/theme.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import queryClient from './queries/queryClient.ts';
import router from './routes/router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
