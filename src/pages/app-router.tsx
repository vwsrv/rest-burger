import { Route, Routes } from 'react-router-dom';
import { IngredientsDetailsContent, ProtectedRoute } from '@/widgets';
import { AppHeader } from '@/shared/ui';
import {
  ForgotPassword,
  Ingredients,
  Login,
  ProfilePage,
  Register,
  Main,
  ResetPassword,
} from '@pages/index.ts';
import ProfileForm from '@/features/profile-form/profile-form';
import UserOrders from '@/features/user-orders/user-orders';

const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <AppHeader />
              <Main />
            </>
          }
        >
          <Route path="ingredients/:id" element={<Ingredients />} />
        </Route>

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
              <ProfilePage />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProfileForm />} />
          <Route path="orders" element={<UserOrders />} />
        </Route>
      </Routes>

      <IngredientsDetailsContent />
    </>
  );
};

export default AppRouter;
