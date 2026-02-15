import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import type { Location } from 'react-router-dom';
import { Main, FeedPage, Profile } from '@pages/index.ts';
import { ProtectedRoute, Orders } from '@/widgets';
import { ProfileForm } from '@/features';

type TProps = {
  location: Location;
};

const BackgroundRoutes: FC<TProps> = ({ location }) => (
  <Routes location={location}>
    <Route path="/" element={<Main />} />
    <Route path="/feed" element={<FeedPage />} />
    <Route
      path="/profile"
      element={
        <ProtectedRoute auth={true}>
          <Profile />
        </ProtectedRoute>
      }
    >
      <Route index element={<ProfileForm />} />
      <Route path="orders" element={<Orders ordersType="user" />} />
    </Route>
  </Routes>
);

export default BackgroundRoutes;
