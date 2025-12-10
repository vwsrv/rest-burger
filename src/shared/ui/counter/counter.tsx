import { Counter } from '@krgaa/react-developer-burger-ui-components';

import type { FC } from 'react';

type TProps = {
  count: number;
  size?: 'default' | 'small' | undefined;
  extraClass?: string | undefined;
};

const UICounter: FC<TProps> = ({ count, size, extraClass = '' }) => {
  return <Counter extraClass={extraClass} count={count} size={size} />;
};

export default UICounter;
