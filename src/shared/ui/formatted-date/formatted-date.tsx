import { FormattedDate } from '@krgaa/react-developer-burger-ui-components';

import type { FC } from 'react';

type TProps = {
  date: Date;
  className?: string;
};

const UIFormattedDate: FC<TProps> = ({ date, className }) => {
  return <FormattedDate date={date} className={className} />;
};

export default UIFormattedDate;
