import { type FC, useState } from 'react';
import styles from './pay-order.module.css';
import { UIButton } from '@/shared/ui';
import { PriceInfo, NotificationModal } from './ui';

const PRICE = 78347;
const ORDER_ID = 2034536;

export const PayOrder: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handlePayment = (): void => {
    setOpen(true);
  };

  return (
    <div className={styles.pay__order}>
      <PriceInfo price={PRICE} />

      <UIButton type="primary" size="large" onClick={handlePayment} htmlType="button">
        Оформить заказ
      </UIButton>

      <NotificationModal open={open} orderId={ORDER_ID} onClose={() => setOpen(false)} />
    </div>
  );
};
