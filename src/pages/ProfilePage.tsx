import {
  budgetDelete,
  selectBudget,
  selectUser,
  useAppDispatch,
  useAppSelector,
  useDeleteBudgetMutation,
  useLogoutMutation,
  userLogout,
} from "../store";
import { useConfirmDialog } from "../hooks";

import { Chip } from "../components";

const confirmStmt = {
  deleteBudget:
    "This action cannot be undone. Are you sure that you want to reset budget and expenses?",
  logout: "Are you sure you want to log out?",
};

export const ProfilePage = () => {
  const { showConfirm, ConfirmDialog } = useConfirmDialog();
  const [deleteBudget, { error, isSuccess }] = useDeleteBudgetMutation();
  const [logout] = useLogoutMutation();
  const { budgetId } = useAppSelector(selectBudget);
  const { displayName } = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const greeting = `Hello, ${displayName || "friend"}!`;

  const handleConfirmDelete = () => {
    showConfirm(confirmStmt.deleteBudget, () => handleDeleteBudget());
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

  const confirmLogout = () => {
    showConfirm(confirmStmt.logout, () => handleLogout());
  };

  const handleLogout = () => {
    try {
      logout({});
      dispatch(userLogout());
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : "Failed to log out the user"
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
      <Chip onClick={confirmLogout} text="Log out" />
      <ConfirmDialog />
    </>
  );
};
