import { useState } from "react";

import { selectBudget, useAppSelector } from "../store";
import { formatBudget } from "../utils";
import { UpdateBudgetForm, Budget, CategoriesChart } from "../components";

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
    <div className="min-w-full min-h-full flex flex-col sm:flex-row sm:mt-20 sm:items-center md:gap-10 lg:gap-1 gap-10 md:items-start lg:items-start">
      <Budget
        handleUpdateBalance={handleUpdateBalance}
        budget={formattedBudget}
      />

      <CategoriesChart />
    </div>
  );
};
