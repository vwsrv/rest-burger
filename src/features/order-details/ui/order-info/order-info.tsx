import type { FC } from 'react';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import type { TOrderItem } from '@/entities/order';
import { MOrderStatus } from '@/entities/order';
import { MOrderStatusText } from '@/shared/ui/order-card';
import type { TOrderLineItem } from '@/shared/utils/order-ingredients.util';
import styles from '../../order-details.module.css';

type TOrderInfoProps = {
  order: TOrderItem;
  cost: number;
  lineItems: TOrderLineItem[];
};

export const OrderInfo: FC<TOrderInfoProps> = ({ order, cost, lineItems }) => (
  <div className={styles.orderDetails}>
    <p className={`${styles.orderDetailsNumber} text_type_digits-default `}>
      #{order.orderNumber}
    </p>
    <div className={styles.orderDetailsTitle}>
      <div className={styles.orderDetailsTitleRow}>
        <h3 className="text text_type_main-medium">{order.name}</h3>
        <p
          className="text text_type_main-small"
          style={{ color: MOrderStatusText[order.status] }}
        >
          {MOrderStatus[order.status]}
        </p>
      </div>
    </div>
    <p className="text text_type_main-medium">Состав:</p>
    <div className={styles.orderIngredients}>
      {lineItems.map((item) => (
        <div key={item.id} className={styles.orderIngredientRow}>
          <div className={styles.orderIngredientImageWrap}>
            <img
              src={item.image}
              alt={item.name}
              className={styles.orderIngredientImage}
            />
          </div>
          <span className={`text text_type_main-default ${styles.orderName}`}>
            {item.name}
          </span>
          <div className={styles.orderIngredientPrice}>
            <span
              className={`text text_type_digits-default ${styles.orderIngredientCount}`}
            >
              {item.count}x {item.price}
            </span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      ))}
    </div>
    <div className={styles.orderDetailsTotal}>
      <span className="text text_type_main-default text_color_inactive">Итого</span>
      <div className={styles.orderDetailsTotalPrice}>
        <span className="text text_type_digits-default">{cost}</span>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  </div>
);
