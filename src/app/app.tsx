import { StrictMode } from 'react';
import { MainPage } from '@pages/main/main-page.tsx';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from '@/shared/error-boundary/error.boundary.tsx';
import './styles/style.module.css';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ForgotPassword, Ingredients, Login, Profile, Register } from '@/pages';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<MainPage />} />

            <Route path="/login" element={<Login />} />

            <Route path="/register" element={<Register />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/ingredients" element={<Ingredients />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
