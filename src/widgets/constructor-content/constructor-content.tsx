import type { FC } from 'react';
import styles from './constructor-content.module.css';
import { BurgerConstructor, PayOrder } from '@/features';

const ConstructorContent: FC = () => {
  return (
    <aside className={styles.right__side}>
      <BurgerConstructor />

      <PayOrder />
    </aside>
  );
};

export default ConstructorContent;
