export interface Category {
  expenseCategoryId: string;
  name: string;
  description: string;
  totalSum: number;
}

export type Categories = Category[];
