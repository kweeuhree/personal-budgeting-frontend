import { type Categories } from "../types";

export const getCategoryId = (categories: Categories, categoryName: string) => {
  const found = categories.find((cat) => cat.name === categoryName);

  if (found) return found.expenseCategoryId;
};

export const getCategoryName = (categories: Categories, categoryId: string) => {
  const found = categories.find((cat) => cat.expenseCategoryId === categoryId);

  if (found) return found.name;
};
