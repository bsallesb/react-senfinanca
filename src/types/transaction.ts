export const TRANSACTION_TYPE_REVENUE = 'revenue';
export const TRANSACTION_TYPE_EXPENSE = 'expense';

export type TransactionType = {
  id: string;
  title: string;
  type: 'revenue' | 'expense';
  value: number;
  category: string;
  created_at: number;
};
