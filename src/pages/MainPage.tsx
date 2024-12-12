import { selectBudget, useAppSelector } from "../store";
import { CreateBudgetForm } from "../components";
import { BudgetPage } from ".";

export const MainPage: React.FC = () => {
  const { budgetId } = useAppSelector(selectBudget);

  return budgetId ? <BudgetPage /> : <CreateBudgetForm />;
};
