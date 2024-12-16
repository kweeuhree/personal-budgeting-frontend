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

import { Button, Chip } from "../components";
import { NavLink } from "react-router-dom";

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
    <div className="min-h-full flex flex-col items-center justify-around">
      <div className="flex flex-col gap-10">
        <div>{error ? "there was an error" : isSuccess && "budget reset"}</div>
        <h1>{greeting}</h1>
        {budgetId ? (
          <div className="flex flex-col gap-5 mb-2">
            <div className="flex flex-col sm:hidden gap-5">
              <NavLink className="content-center" to="/expenses">
                <Button buttonText="View expenses" buttonType="button" />
              </NavLink>
              <NavLink className="content-center" to="/categories">
                <Button buttonText="View categories" buttonType="button" />
              </NavLink>
            </div>
            <div>
              <Button
                buttonText="Reset budget"
                buttonType="submit"
                onClick={handleConfirmDelete}
              />
            </div>
          </div>
        ) : (
          "create a budget to start tracking expenses"
        )}
      </div>
      <Chip onClick={confirmLogout} text="Log out" />

      <ConfirmDialog />
    </div>
  );
};
