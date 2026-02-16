import type { FC, ReactNode } from 'react';
import styles from './right-side.module.css';

type TProps = {
  children: ReactNode;
};

const RightSide: FC<TProps> = ({ children }) => {
  return <aside className={styles.right__side}>{children}</aside>;
};

export default RightSide;
