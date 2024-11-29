import { CreateBudgetForm } from "../components";
import { BudgetPage } from ".";
import { isBudgetNotEmpty, useAppSelector } from "../store";

export const MainPage: React.FC = () => {
  const budgetExists = useAppSelector(isBudgetNotEmpty);
  console.log("does this user have a budget? -", budgetExists);

  return budgetExists ? <BudgetPage /> : <CreateBudgetForm />;
};
