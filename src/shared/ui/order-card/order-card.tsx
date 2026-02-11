import {
  type FC,
  useCallback,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from 'react';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import styles from './order-card.module.css';
import { UIBox, UIButton } from '@/shared/ui';
import { useImagesOrderHook } from '@/shared/ui/order-card/hooks';
import { clsx } from 'clsx';

const MAX_VISIBLE = 6;
const SLOT_W = 64;
const SLOT_GAP = 48;

type TProps = {
  orderId: number;
  date: string;
  count: number;
  title: string;
  cost: string;
  images: string[];
  onClick?: (index: number) => void;
};

export const UIOrderCard: FC<TProps> = ({
  orderId,
  date,
  title,
  images,
  onClick,
  cost,
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

  const handleIngredientClick = useCallback(
    (index: number) => (e?: ReactMouseEvent<HTMLButtonElement>) => {
      e?.stopPropagation();
      onClick?.(index);
    },
    [onClick]
  );

  return (
    <UIBox className={styles.orderCard} {...props}>
      <div className={styles.orderCardRow}>
        <p className="text text_type_digits-default">#{orderId}</p>
        <p className="text text_type_main-default text_color_inactive">{date}</p>
      </div>
      <h3 className="text text_type_main-medium">{title}</h3>
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
                onClick={handleIngredientClick(item.index)}
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
