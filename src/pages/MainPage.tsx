import { CreateBudgetForm } from "../components";
import { BudgetPage } from ".";
import { selectBudget, useAppSelector } from "../store";

export const MainPage: React.FC = () => {
  const { budgetId } = useAppSelector(selectBudget);

  return budgetId ? <BudgetPage /> : <CreateBudgetForm />;
};
