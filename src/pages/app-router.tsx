import { Route, Routes } from 'react-router-dom';
import { IngredientModalProvider, ProtectedRoute } from '@/widgets';
import {
  ForgotPassword,
  Ingredients,
  Login,
  Profile,
  Register,
  Main,
  ResetPassword,
} from '@pages/index.ts';

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute auth={true}>
              <Main />
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
          path="/reset-password"
          element={
            <ProtectedRoute auth={false}>
              <ResetPassword />
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
          path="/ingredients/:id"
          element={
            <ProtectedRoute auth={true}>
              <Ingredients />
            </ProtectedRoute>
          }
        />
      </Routes>

      <IngredientModalProvider />
    </>
  );
};

export default AppRouter;
