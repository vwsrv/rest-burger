import type { FC } from 'react';
import { UIModal } from '@/shared/ui';
import { OrderInfo } from './order-info';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/store';
import { clearOrder } from '@/app/store/slices/order-feed';
import type { TOrderItem } from '@/entities/order';
import type { TOrderLineItem } from '@/shared/utils/order-ingredients.util';
import styles from '../order-details.module.css';

type TProps = {
  order: TOrderItem;
  cost: number;
  lineItems: TOrderLineItem[];
  date: string;
  backPath: string;
  onClose: () => void;
};

export const OrderDetailsModal: FC<TProps> = ({
  order,
  cost,
  lineItems,
  date,
  backPath,
  onClose,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    onClose();
    navigate(backPath, { replace: true });
    dispatch(clearOrder());
  };

  return (
    <UIModal open={!!order} onClose={handleClose} className={styles.orderDetailsOverlay}>
      <OrderInfo order={order} cost={cost} date={date} lineItems={lineItems} />
    </UIModal>
  );
};

export default OrderDetailsModal;
