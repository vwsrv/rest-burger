import type { FC } from 'react';
import PriceInfo from './ui/price-info';
import { UIButton } from '@/shared/ui/button';
import styles from './pay-order.module.css';

const PayOrder: FC = () => {
  const PRICE = 78347;

  return (
    <div className={styles.pay__order}>
      <PriceInfo price={PRICE} />

      <UIButton
        type="primary"
        size="large"
        onClick={() => console.log('Click')}
        htmlType="button"
      >
        Оформить заказ
      </UIButton>
    </div>
  );
};

export default PayOrder;
