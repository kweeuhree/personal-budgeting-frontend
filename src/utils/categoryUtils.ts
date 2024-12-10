import { Expenses, type Categories } from "../types";

export const getCategoryId = (categories: Categories, categoryName: string) => {
  const found = categories.find((cat) => cat.name === categoryName);

  if (found) return found.expenseCategoryId;
};

export const getCategoryName = (categories: Categories, categoryId: string) => {
  const found = categories.find((cat) => cat.expenseCategoryId === categoryId);

  if (found) return found.name;
};

const filterByBalanceType = (expenses: Expenses, balanceType: string) => {
  return expenses.filter((exp) => exp.expenseType === balanceType);
};

export const getGroupedExpenses = (
  categories: Categories,
  expenses: Expenses,
  balanceType: string
): number[] => {
  const filteredByBalanceType = filterByBalanceType(expenses, balanceType);
  const groupedExpenses: { [key: string]: number } = {};

  categories.forEach((cat) => {
    const filteredByCategory = filteredByBalanceType.filter(
      (exp) => exp.categoryId === cat.expenseCategoryId
    );

    const total = filteredByCategory.reduce(
      (sum, exp) => sum + exp.amountInCents,
      0
    );

    groupedExpenses[cat.name] = total;
  });

  return Object.values(groupedExpenses);
};
