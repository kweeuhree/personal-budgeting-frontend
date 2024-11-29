import React from "react";

import { CreateBudgetForm } from "../components";
import { BudgetPage } from ".";
import { selectBudget, useAppSelector } from "../store";

export const MainPage: React.FC = () => {
  const { budgetId } = useAppSelector(selectBudget);
  console.log("does this user have a budget? -", budgetId);
  console.log();

  return budgetId ? <BudgetPage /> : <CreateBudgetForm />;
};
