export interface WorryTempProps {
  id: string | number[];
  worryId: number;
  categoryName: string;
  worryStartDate: string;
  worryExpiryDate: string;
  worryReview?: string;
  locked: boolean;
  realized: boolean;
  finished: boolean;
  isChecked: boolean;
}
