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
    <div className="min-w-full flex items-center md:gap-1 lg:gap-1 gap-10 flex-col sm:flex-row">
      <Budget
        handleUpdateBalance={handleUpdateBalance}
        budget={formattedBudget}
      />

      <CategoriesChart />
    </div>
  );
};
