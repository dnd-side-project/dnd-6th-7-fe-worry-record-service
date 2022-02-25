import { format } from 'date-fns';

export function getDate(date: string, dateFormat: string): string {
  return format(new Date(date), dateFormat);
}
