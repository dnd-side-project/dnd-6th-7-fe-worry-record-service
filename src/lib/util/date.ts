import { format, add, formatISO } from 'date-fns';

export function getDate(date: string, dateFormat: string): string {
  return format(new Date(date), dateFormat);
}

export function addDate(date: string | Date, addDay: number): Date {
  return add(new Date(date), { days: addDay });
}

export function getIsoDate(date: string | Date): string {
  return formatISO(new Date(date));
}
