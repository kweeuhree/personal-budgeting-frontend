import React, { useState } from "react";
import { selectBudget, useAppSelector } from "../store";
import { formatBudget } from "../utils";
import { UpdateBudgetForm } from "../components";

export const BudgetPage = () => {
  const budget = useAppSelector(selectBudget);
  const [editMode, setEditMode] = useState(false);
  const [formProps, setFormProps] = useState({ balanceType: "" });
  const formattedBudget = formatBudget(budget);
  const {
    checkingBalance,
    savingsBalance,
    budgetTotal,
    totalSpent,
    budgetRemaining,
  } = formattedBudget;

  const handleUpdateBalance = (balanceType: string) => {
    setFormProps({ balanceType });
    setEditMode(true);
  };

  return editMode ? (
    <UpdateBudgetForm {...formProps} setEditMode={setEditMode} />
  ) : (
    <div>
      <div>
        Checking balance: {checkingBalance}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleUpdateBalance("CheckingBalance")}
        >
          (+)
        </span>
      </div>
      <div>
        Savings balance: {savingsBalance}
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleUpdateBalance("SavingsBalance")}
        >
          (+)
        </span>
      </div>
      <div>Total budget: {budgetTotal}</div>
      <div>Total spent: {totalSpent}</div>
      <div>Total remaining: {budgetRemaining}</div>
    </div>
  );
};
