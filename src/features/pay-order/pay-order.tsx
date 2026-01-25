import { type FC, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './pay-order.module.css';
import { UIButton } from '@/shared/ui';
import { PriceInfo, NotificationModal } from './ui';
import {
  clearConstructor,
  clearOrder,
  createOrderThunk,
  getTotalPrice,
  useAppDispatch,
  useAppSelector,
} from '@/app/store';
import { getCookie } from '@/entities/user/auth/utils';
import { getItem } from '@/shared/utils';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/shared/api/constants';
import { useCountdown } from '@/shared/hooks';

type TModalContent = {
  status: string;
  description: string;
  orderId?: number;
  countdown?: number;
};

export const PayOrder: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { order, loading, error } = useAppSelector((state) => state.order);
  const { bun } = useAppSelector((state) => state.burgerConstructor);
  const price = useAppSelector(getTotalPrice);

  const [open, setOpen] = useState<boolean>(false);

  const handlePayment = (): void => {
    const accessToken = getCookie(ACCESS_TOKEN_KEY);
    const refreshToken = getItem<string>(REFRESH_TOKEN_KEY);
    const isAuthenticated = Boolean(accessToken || refreshToken);

    if (!isAuthenticated) {
      setIsUnauthorized(true);
      resetCountdown();
      setOpen(true);
      return;
    }

    setOpen(true);
    dispatch(clearOrder());

    dispatch(createOrderThunk())
      .unwrap()
      .then(() => {
        dispatch(clearConstructor());
      });
  };

  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const { countdown, reset: resetCountdown } = useCountdown({
    initialValue: 3,
    isActive: isUnauthorized && open,
    onComplete: () => {
      navigate('/login', { state: { from: location } });
      setIsUnauthorized(false);
      setOpen(false);
      resetCountdown();
    },
  });

  const getModalContent = (): TModalContent | null => {
    if (isUnauthorized) {
      return {
        status: 'Вы не авторизованы',
        description: 'Сейчас вы будете перенаправлены на страницу входа..',
        countdown,
      };
    }

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
        disabled={!bun || loading}
        onClick={handlePayment}
        htmlType="button"
      >
        {loading ? 'Оформляем заказ...' : `Оформить заказ`}
      </UIButton>

      {content && (
        <NotificationModal
          open={open}
          orderId={content.orderId}
          status={content.status}
          description={content.description}
          countdown={content.countdown}
          onClose={() => {
            setOpen(false);
            setIsUnauthorized(false);
            resetCountdown();
          }}
        />
      )}
    </div>
  );
};

export default PayOrder;
