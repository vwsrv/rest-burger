import type { FC } from 'react';
import { UIModal } from '@/shared/ui';
import styles from './notification-modal.module.css';

type TProps = {
  open: boolean;
  onClose: () => void;
  orderId?: number;
  status: string;
  description: string;
  countdown?: number;
};

export const NotificationModal: FC<TProps> = ({
  orderId,
  open,
  onClose,
  status,
  description,
  countdown,
}) => {
  return (
    <UIModal open={open} onClose={onClose}>
      <div className={styles.notification__container}>
        {orderId && (
          <>
            <div className={styles.notification__title}>
              <h1
                className={`text text_type_digits-large ${styles.notification__order_id}`}
              >
                {orderId}
              </h1>

              <p className="text text_type_main-medium">идентификатор заказа</p>
            </div>

            <img src="/order-status/success.png" alt="заказ успешно оформлен" />
          </>
        )}

        {countdown !== undefined && (
          <div className={styles.notification__title}>
            <h1
              className={`text text_type_digits-large ${styles.notification__order_id}`}
            >
              {countdown}
            </h1>
          </div>
        )}

        <div className={styles.notification__description}>
          <p className="text text_type_main-default">{status}</p>

          <p className={`text text_type_main-default ${styles.description_action}`}>
            {description}
          </p>
        </div>
      </div>
    </UIModal>
  );
};
