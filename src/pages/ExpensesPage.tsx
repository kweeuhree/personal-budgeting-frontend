import {
  selectAllExpenses,
  useAppDispatch,
  useAppSelector,
  useExpenseDeleteMutation,
  deleteExpense,
} from "../store";
import { Expenses } from "../components";
import { Expense } from "../types";
import { useConfirmDialog } from "../hooks";

const confirmStmt = (amountInDollars: string) => {
  return `Are you sure you want to permanently delete ${amountInDollars}?`;
};

export const ExpensesPage = () => {
  const { showConfirm, ConfirmDialog } = useConfirmDialog();
  const expenses = useAppSelector(selectAllExpenses);
  const [expenseDelete, { isSuccess, error }] = useExpenseDeleteMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async (expense: Expense) => {
    try {
      const response = await expenseDelete(expense.expenseId).unwrap();
      if (response.ok) {
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
    if (found) {
      showConfirm(confirmStmt(amountInDollars), () => handleDelete(expense));
    }
  };

  return (
    <div className="flex flex-col items-center min-w-full">
      <header className="flex min-w-full font-medium">Expenses</header>
      {isSuccess ? "Expense deleted" : error && "Error"}
      {expenses.length > 0 ? (
        <Expenses
          handleConfirmDelete={handleConfirmDelete}
          expenses={expenses}
        />
      ) : (
        "no expenses"
      )}
      <ConfirmDialog />
    </div>
  );
};
