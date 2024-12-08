import {
  selectAllExpenses,
  useAppDispatch,
  useAppSelector,
  useExpenseDeleteMutation,
  deleteExpense,
} from "../store";
import { Expenses } from "../components";
import { Expense } from "../types";

export const ExpensesPage = () => {
  const expenses = useAppSelector(selectAllExpenses);
  const [expenseDelete, { isSuccess, error }] = useExpenseDeleteMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async (expense: Expense) => {
    try {
      console.log("attempting delete...");
      const response = await expenseDelete(expense.expenseId).unwrap();
      dispatch(deleteExpense(expense));
      if (response.ok) {
        console.log("dispatching delete");
        dispatch(deleteExpense(expense));
      }
    } catch (error) {
      throw new Error(
        `Failed to delete expense: ${error instanceof Error ? error.message : error}`
      );
    }
  };

  const handleConfirmDelete = (expense: Expense, amountInDollars: string) => {
    const found = expenses.find((exp) => exp.expenseId === expense.expenseId);
    const confirmStmt = `Are you sure you want to permanently delete ${amountInDollars}?`;
    if (found && confirm(confirmStmt)) {
      handleDelete(expense);
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
