import { budgetExists, useAppSelector } from "../store";
import { CreateBudgetForm } from "../components";
import { BudgetPage } from ".";

export const MainPage: React.FC = () => {
  const doesBudgetExist = useAppSelector(budgetExists);

  return doesBudgetExist ? <CreateBudgetForm /> : <BudgetPage />;
};
