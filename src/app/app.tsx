import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from '@/shared/error-boundary/error.boundary.tsx';
import './styles/style.module.css';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from '@pages/app-router.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <AppRouter />
        </Router>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
