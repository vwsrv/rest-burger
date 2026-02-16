import type { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { OrderDetailsContent } from '@/widgets';
import OrderDetailsPage from '../order-details/order-details-page';

const ProfileOrderPage: FC = () => {
  const location = useLocation();

  if (location?.state?.fromOrders || location?.state?.backgroundLocation) {
    return <OrderDetailsContent />;
  }

  return <OrderDetailsPage />;
};

export default ProfileOrderPage;
