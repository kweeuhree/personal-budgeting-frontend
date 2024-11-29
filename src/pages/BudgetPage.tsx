import React from "react";
import { selectBudget, useAppSelector } from "../store";
import { formatBudget } from "../utils";

export const BudgetPage = () => {
  const budget = useAppSelector(selectBudget);
  const formattedBudget = formatBudget(budget);
  const {
    checkingBalance,
    savingsBalance,
    budgetTotal,
    totalSpent,
    budgetRemaining,
  } = formattedBudget;

  return (
    <div>
      <div>Checking balance: {checkingBalance}</div>
      <div>Savings balance: {savingsBalance}</div>
      <div>Total budget: {budgetTotal}</div>
      <div>Total spent: {totalSpent}</div>
      <div>Total remaining: {budgetRemaining}</div>
    </div>
  );
};
