export interface Expense {
  amountInCents: number;
  categoryId: string;
  expenseId: string;
  expenseType: string;
  description?: string;
  createdAt: string;
}

export type Expenses = Expense[];
