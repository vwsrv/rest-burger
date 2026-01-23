import { StrictMode } from 'react';
import { MainPage } from '@pages/main/main-page.tsx';
import { createRoot } from 'react-dom/client';
import ErrorBoundary from '@/shared/error-boundary/error.boundary.tsx';
import './styles/style.module.css';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ForgotPassword, Ingredients, Login, Profile, Register } from '@/pages';
import { ProtectedRoute } from '@/widgets';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute auth={true}>
                  <MainPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/login"
              element={
                <ProtectedRoute auth={false}>
                  <Login />
                </ProtectedRoute>
              }
            />

            <Route
              path="/register"
              element={
                <ProtectedRoute auth={false}>
                  <Register />
                </ProtectedRoute>
              }
            />

            <Route
              path="/forgot-password"
              element={
                <ProtectedRoute auth={false}>
                  <ForgotPassword />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute auth={true}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/ingredients"
              element={
                <ProtectedRoute auth={true}>
                  <Ingredients />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);
