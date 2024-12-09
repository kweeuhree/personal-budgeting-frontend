import { useState } from "react";
import { selectBudget, useAppSelector } from "../store";
import { formatBudget } from "../utils";
import { UpdateBudgetForm, Budget } from "../components";

export const BudgetPage = () => {
  const budget = useAppSelector(selectBudget);
  const [editMode, setEditMode] = useState(false);
  const [formProps, setFormProps] = useState({ balanceType: "" });
  const formattedBudget = formatBudget(budget);

  const handleUpdateBalance = (balanceType: string) => {
    setFormProps({ balanceType });
    setEditMode(true);
  };

  return editMode ? (
    <UpdateBudgetForm {...formProps} setEditMode={setEditMode} />
  ) : (
    <div className="budget-page-container flex">
      <Budget
        handleUpdateBalance={handleUpdateBalance}
        budget={formattedBudget}
      />

      <div className="chart-container"></div>
    </div>
  );
};
