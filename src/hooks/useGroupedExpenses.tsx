import { useMemo } from "react";

import { useAppSelector, selectAllExpenses, selectCategories } from "../store";
import {
  getGroupedExpenses,
  SAVINGS_BALANCE,
  CHECKING_BALANCE,
} from "../utils";

export const useGroupedExpenses = () => {
  const expenses = useAppSelector(selectAllExpenses);
  const categories = useAppSelector(selectCategories);

  const groupedSavings = useMemo(
    () => getGroupedExpenses(categories, expenses, SAVINGS_BALANCE),
    [categories, expenses]
  );
  const groupedChecking = useMemo(
    () => getGroupedExpenses(categories, expenses, CHECKING_BALANCE),
    [categories, expenses]
  );

  return { groupedSavings, groupedChecking };
};
