import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';
import styles from './price-info.module.css';
import type { FC } from 'react';

type TProps = {
  price: number;
  type?: 'primary' | 'secondary' | 'error' | 'success';
};

const PriceInfo: FC<TProps> = ({ price, type = 'primary' }) => {
  return (
    <div className={styles.price__info}>
      <p className="text text_type_digits-medium">{price}</p>

      <CurrencyIcon type={type} />
    </div>
  );
};

export default PriceInfo;
