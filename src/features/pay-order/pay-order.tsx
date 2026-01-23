import { type FC, useState } from 'react';
import styles from './pay-order.module.css';
import { UIButton } from '@/shared/ui';
import { PriceInfo, NotificationModal } from './ui';
import {
  clearConstructor,
  createOrderThunk,
  getTotalPrice,
  useAppDispatch,
  useAppSelector,
} from '@/app/store';

type TModalContent = {
  status: string;
  description: string;
  orderId?: number;
};

export const PayOrder: FC = () => {
  const dispatch = useAppDispatch();
  const { order, loading, error } = useAppSelector((state) => state.order);
  const { bun } = useAppSelector((state) => state.burgerConstructor);
  const price = useAppSelector(getTotalPrice);

  const [open, setOpen] = useState<boolean>(false);

  const handlePayment = (): void => {
    setOpen(true);

    dispatch(createOrderThunk())
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };

  const getModalContent = (): TModalContent | null => {
    if (order) {
      return {
        status: 'Ваш заказ начали готовить',
        description: 'Дождитесь готовности на орбитальной станции',
        orderId: order.orderId,
      };
    }

    if (error) {
      return {
        status: 'Ошибка при создании заказа',
        description: error || 'Попробуйте еще раз',
      };
    }

    if (!bun) {
      return {
        status: 'Ошибка',
        description: 'Добавьте булку в конструктор',
      };
    }

    return null;
  };

  const content = getModalContent();

  return (
    <div className={styles.pay__order}>
      <PriceInfo price={price} />

      <UIButton
        type="primary"
        size="large"
        disabled={!bun}
        onClick={handlePayment}
        htmlType="button"
      >
        {loading ? 'Оформляем заказ' : `Оформить заказ`}
      </UIButton>

      {content && (
        <NotificationModal
          open={open}
          orderId={content.orderId}
          status={content.status}
          description={content.description}
          onClose={() => setOpen(false)}
        />
      )}
    </div>
  );
};

export default PayOrder;
