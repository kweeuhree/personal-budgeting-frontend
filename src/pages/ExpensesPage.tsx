import {
  selectAllExpenses,
  useAppDispatch,
  useAppSelector,
  useExpenseDeleteMutation,
  deleteExpense,
  budgetUpdate,
} from "../store";
import { Expenses } from "../components";

export const ExpensesPage = () => {
  const expenses = useAppSelector(selectAllExpenses);
  const [expenseDelete, { isSuccess, error }] = useExpenseDeleteMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async (expenseId: string) => {
    try {
      console.log("attempting delete...");
      const updatedBudget = await expenseDelete(expenseId).unwrap();
      dispatch(deleteExpense(expenseId));
      dispatch(budgetUpdate(updatedBudget));
    } catch (error) {
      throw new Error(
        `Failed to delete expense: ${error instanceof Error ? error.message : error}`
      );
    }
  };

  const handleConfirmDelete = (expenseId: string, amountInDollars: string) => {
    const found = expenses.find((exp) => exp.expenseId === expenseId);
    const confirmStmt = `Are you sure you want to permanently delete ${amountInDollars}?`;
    if (found && confirm(confirmStmt)) {
      handleDelete(expenseId);
    }
  };

  return (
    <>
      <div>ExpensesPage</div>
      {isSuccess ? "Expense deleted" : error && "Error"}
      {expenses.length > 0 ? (
        <Expenses
          handleConfirmDelete={handleConfirmDelete}
          expenses={expenses}
        />
      ) : (
        "no expenses"
      )}
    </>
  );
};
