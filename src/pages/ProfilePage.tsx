import {
  budgetDelete,
  selectBudget,
  selectUser,
  useAppDispatch,
  useAppSelector,
  useDeleteBudgetMutation,
} from "../store";
import { useConfirmDialog } from "../hooks";

const confirmStmt =
  "This action cannot be undone. Are you sure that you want to reset budget and expenses?";

export const ProfilePage = () => {
  const { showConfirm, ConfirmDialog } = useConfirmDialog();
  const [deleteBudget, { error, isSuccess }] = useDeleteBudgetMutation();
  const { budgetId } = useAppSelector(selectBudget);
  const { displayName } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const greeting = `Hello, ${displayName || "friend"}!`;

  const handleConfirmDelete = () => {
    showConfirm(confirmStmt, () => handleDeleteBudget());
  };

  const handleDeleteBudget = async () => {
    try {
      await deleteBudget(budgetId);
      dispatch(budgetDelete());
    } catch (error) {
      throw new Error(
        `Failed deleting budget: ${error instanceof Error ? error.message : "Unknown error."}`
      );
    }
  };

  return (
    <>
      <div>
        <div>{error ? "there was an error" : isSuccess && "budget reset"}</div>
        <div>{greeting}</div>
        {budgetId ? (
          <button onClick={handleConfirmDelete}>Reset budget</button>
        ) : (
          "create a budget to start tracking expenses"
        )}
      </div>
      <ConfirmDialog />
    </>
  );
};
