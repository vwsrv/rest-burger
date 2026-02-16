import {
  type FC,
  useCallback,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import type { TOrderStatus } from '@/entities/order';
import styles from './order-card.module.css';
import { UIBox, UIButton } from '@/shared/ui';
import { useImagesOrderHook } from '@/shared/ui/order-card/hooks';
import { MOrderStatusText } from './maps/order-status-style.map.ts';
import { clsx } from 'clsx';

const MAX_VISIBLE = 6;
const SLOT_W = 64;
const SLOT_GAP = 48;

type TProps = {
  className?: string;
  orderId: number;
  date: string;
  count: number;
  title: string;
  cost: string;
  status: string;
  statusKey: TOrderStatus;
  images: string[];
  onClick?: () => void;
};

export const UIOrderCard: FC<TProps> = ({
  orderId,
  date,
  title,
  images,
  status,
  statusKey,
  cost,
  className,
  ...props
}) => {
  const { setExpanded, isExpanded, items } = useImagesOrderHook(images, MAX_VISIBLE);

  const wrapWidth = SLOT_W + SLOT_GAP * (items.length - 1);

  const handleExpand = useCallback(
    (e: ReactMouseEvent | KeyboardEvent) => {
      e.stopPropagation();
      e.preventDefault();
      setExpanded(true);
    },
    [setExpanded]
  );

  return (
    <UIBox className={clsx(styles.orderCard, className)} {...props}>
      <div className={styles.orderCardRow}>
        <p className="text text_type_digits-default">#{orderId}</p>
        <p className="text text_type_main-default text_color_inactive">{date}</p>
      </div>
      <div className={styles.orderCardTextRow}>
        <h3 className="text text_type_main-medium">{title}</h3>
        <p
          className="text text_type_main-small"
          style={{ color: MOrderStatusText[statusKey] }}
        >
          {status}
        </p>
      </div>
      <div className={styles.orderCardRow}>
        <div
          className={clsx(styles.orderCard__img_wrapper, {
            [styles.orderCard__img_wrapper_expanded]: isExpanded,
          })}
          style={{ maxWidth: wrapWidth }}
        >
          {items.map((item) => (
            <div
              key={`${item.src}-${item.index}`}
              className={clsx(styles.orderCard__img_btn_wrap, {
                [styles.orderCard__img_btn_slideIn]: item.slideIn,
              })}
              style={{ zIndex: items.length - item.index }}
            >
              <UIButton
                htmlType="button"
                size="small"
                type="none"
                className={styles.orderCard__img_btn}
              >
                <img
                  src={item.src}
                  alt={`Ингредиент ${item.index + 1}`}
                  className={styles.orderCard__img}
                />
              </UIButton>
              {item.showOverlay && (
                <div
                  className={styles.orderCard__img_overlay}
                  onClick={handleExpand}
                  role="button"
                  tabIndex={0}
                >
                  +{item.restCount}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className={styles.orderCard__price}>
          <p className={`text text_type_digits-default ${styles.orderCard__price}`}>
            {cost}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </UIBox>
  );
};

export default UIOrderCard;
