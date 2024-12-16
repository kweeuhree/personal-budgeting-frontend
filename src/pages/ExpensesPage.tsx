import {
  selectAllExpenses,
  useAppDispatch,
  useAppSelector,
  useExpenseDeleteMutation,
  deleteExpense,
} from "../store";
import { Button, CreateExpenseForm, Expenses } from "../components";
import { Expense } from "../types";
import { useConfirmDialog, useHandleNavigate } from "../hooks";

const confirmStmt = (amountInDollars: string) => {
  return `Are you sure you want to permanently delete ${amountInDollars}?`;
};

export const ExpensesPage = () => {
  const { handleNavigate } = useHandleNavigate();
  const { showConfirm, ConfirmDialog } = useConfirmDialog();
  const expenses = useAppSelector(selectAllExpenses);
  const [expenseDelete] = useExpenseDeleteMutation();
  const dispatch = useAppDispatch();

  const handleDelete = async (expense: Expense) => {
    try {
      await expenseDelete(expense.expenseId).unwrap();
      dispatch(deleteExpense(expense));
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
    <div className="flex flex-col items-center min-w-full min-h-full">
      <header className="flex items-center justify-between min-w-full px-2 mt-16 sm:mt-3">
        <div className="font-medium">Expenses</div>
        <Button
          buttonType="button"
          buttonText="Create Expense +"
          onClick={() => handleNavigate("/expenses/create")}
        />
      </header>

      {expenses.length > 0 ? (
        <Expenses
          expenses={expenses}
          handleConfirmDelete={handleConfirmDelete}
        />
      ) : (
        <CreateExpenseForm />
      )}
      <ConfirmDialog />
    </div>
  );
};
