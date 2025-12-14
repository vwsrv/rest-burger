import type { FC } from 'react';
import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './card.module.css';
import { UIBox, UICounter } from '@/shared/ui';

type TProps = {
  image: string;
  cost: string;
  count: number;
  title: string;
  currencyTheme: 'primary' | 'secondary' | 'error' | 'success';
};

export const UICard: FC<TProps> = ({
  image,
  cost,
  count,
  title,
  currencyTheme = 'primary',
  ...props
}) => {
  return (
    <UIBox className={styles.card} {...props}>
      <img src={image} alt={title} className={styles.card__img} />

      <UICounter size="default" count={count} extraClass={styles.counter} />

      <div className={styles.card__price}>
        <p className={`text text_type_digits-medium ${styles.card__price}`}>{cost}</p>

        <CurrencyIcon type={currencyTheme} />
      </div>

      <h2 className="text text_type_main-default">{title}</h2>
    </UIBox>
  );
};

export default UICard;
