import {
  budgetDelete,
  selectBudget,
  selectUser,
  useAppDispatch,
  useAppSelector,
  useDeleteBudgetMutation,
} from "../store";

export const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { displayName } = useAppSelector(selectUser);
  const [deleteBudget, { error, isSuccess }] = useDeleteBudgetMutation();
  const { budgetId } = useAppSelector(selectBudget);

  console.log("Display name", displayName);

  const greeting = `Hello, ${displayName || "friend"}!`;

  const handleDeleteBudget = () => {
    const confirmStmt =
      "This action cannot be undone. Are you sure that you want to reset budget?";
    if (confirm(confirmStmt)) {
      try {
        deleteBudget(budgetId);
        dispatch(budgetDelete());
      } catch (error) {
        throw new Error(
          `Failed deleting budget: ${error instanceof Error ? error.message : "Unknown error."}`
        );
      }
    }
    return;
  };

  return (
    <div>
      <div>{error ? "there was an error" : isSuccess && "budget reset"}</div>
      <div>{greeting}</div>
      {budgetId ? (
        <button onClick={handleDeleteBudget}>Reset budget</button>
      ) : (
        "create a budget to start tracking expenses"
      )}
    </div>
  );
};
