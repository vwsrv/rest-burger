import type { FC, ReactNode } from 'react';
import styles from './left-side.module.css';

type TProps = {
  children: ReactNode;
};

const LeftSide: FC<TProps> = ({ children }) => {
  return <aside className={styles.left__side}>{children}</aside>;
};

export default LeftSide;
