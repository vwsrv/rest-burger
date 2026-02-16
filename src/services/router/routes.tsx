import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute, MainLayout, FeedLayout, OrdersLayout } from '@/widgets';
import RootLayout, {
  ForgotPassword,
  IngredientDetailsPage,
  Login,
  Profile,
  Register,
  ResetPassword,
  FeedOrderDetails,
  ProfileOrderDetails,
} from '@pages/index.ts';
import { ProfileForm } from '@/features';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: 'feed',
        element: <FeedLayout />,
        children: [
          { index: true, element: null },
          { path: ':id', element: <FeedOrderDetails /> },
        ],
      },

      {
        path: 'login',
        element: (
          <ProtectedRoute auth={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
      {
        path: 'register',
        element: (
          <ProtectedRoute auth={false}>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: 'forgot-password',
        element: (
          <ProtectedRoute auth={false}>
            <ForgotPassword />
          </ProtectedRoute>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <ProtectedRoute auth={false}>
            <ResetPassword />
          </ProtectedRoute>
        ),
      },

      {
        path: 'profile',
        element: (
          <ProtectedRoute auth={true}>
            <Profile />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <ProfileForm /> },
          {
            path: 'orders',
            element: <OrdersLayout ordersType="user" />,
            children: [
              { index: true, element: null },
              { path: ':id', element: <ProfileOrderDetails /> },
            ],
          },
        ],
      },

      {
        path: 'ingredients/:id',
        element: <MainLayout />,
        children: [{ index: true, element: <IngredientDetailsPage /> }],
      },
      {
        path: '*',
        element: <MainLayout />,
        children: [{ index: true, element: null }],
      },
    ],
  },
  { path: '*', element: <Navigate to="/" replace /> },
];

export const router = createBrowserRouter(routes);
