import { StrictMode } from 'react';
import { MainPage } from '@pages/main-page.tsx';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from '@/shared/error-boundary/error.boundary.tsx';
import './styles/style.css';
import { Provider } from 'react-redux';
import { store } from '@/app/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <MainPage />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
