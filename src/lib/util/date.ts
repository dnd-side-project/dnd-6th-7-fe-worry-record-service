import { format } from 'date-fns';

export function getDate(date: Date, dateFormat: string): string {
	return format(date, dateFormat);
}
