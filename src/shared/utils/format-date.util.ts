import {
  differenceInCalendarDays,
  format,
  isToday,
  isYesterday,
  parseISO,
} from 'date-fns';
import { ru } from 'date-fns/locale';
import { pluralize } from './pluralize.util';

export const formatDate = (dateInput: string): string => {
  const date = parseISO(dateInput);
  const timeStr = format(date, 'HH:mm', { locale: ru });

  if (isToday(date)) return `сегодня, ${timeStr}`;
  if (isYesterday(date)) return `вчера, ${timeStr}`;

  const days = differenceInCalendarDays(new Date(), date);
  return `${days}${pluralize(days, 'день', 'дня', 'дней')} назад, ${timeStr}`;
};
