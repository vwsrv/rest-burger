import { StrictMode } from 'react';
import { MainPage } from '@pages/main-page.tsx';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from '@/shared/error-boundary/error.boundary.tsx';
import './styles/style.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <MainPage />
    </ErrorBoundary>
  </StrictMode>
);
