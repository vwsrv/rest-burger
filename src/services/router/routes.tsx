import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import { AppHeader } from '@/shared/ui';
import { Orders, ProtectedRoute, IngredientsDetailsContent } from '@/widgets';
import {
  ForgotPassword,
  Ingredients,
  Login,
  Profile,
  Register,
  Main,
  ResetPassword,
  FeedPage,
} from '@pages/index.ts';
import { OrderDetails, ProfileForm } from '@/features';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <>
        <AppHeader />
        <Outlet />
        <IngredientsDetailsContent />
      </>
    ),
    children: [
      { index: true, element: <Main /> },
      { path: 'ingredients/:id', element: <Ingredients /> },
      {
        path: 'feed',
        element: <FeedPage />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <ProtectedRoute auth={false}>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: '/register',
    element: (
      <ProtectedRoute auth={false}>
        <Register />
      </ProtectedRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <ProtectedRoute auth={false}>
        <ForgotPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: '/reset-password',
    element: (
      <ProtectedRoute auth={false}>
        <ResetPassword />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile',
    element: (
      <ProtectedRoute auth={true}>
        <Profile />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <ProfileForm /> },
      {
        path: 'orders',
        element: <Outlet />,
        children: [
          { index: true, element: <Orders ordersType="user" /> },
          { path: ':id', element: <OrderDetails /> },
        ],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
];

export const router = createBrowserRouter(routes);
