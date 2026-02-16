import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from '@/shared/error-boundary/error.boundary.tsx';
import './styles/style.module.css';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/services';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
