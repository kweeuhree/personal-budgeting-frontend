export interface Expense {
  expenseId: string;
  amountInCents: number;
  description?: string;
  expenseCategoryId: string;
  createdAt: string;
}

export type Expenses = Expense[];
