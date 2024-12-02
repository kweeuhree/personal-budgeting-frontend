import { createListenerMiddleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import { categoryApi, expenseApi, authApi } from "./apis";
import { addCategories, addExpenses } from "./slices";

export const logger = createLogger({
  collapsed: true, // Collapse actions for better readability
  duration: true, // Log the duration of each action
  timestamp: false, // Disable timestamps
  diff: true, // Show the state differences
});

export const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (_, { dispatch }) => {
    try {
      const categories = await dispatch(
        categoryApi.endpoints.fetchAllCategories.initiate({})
      ).unwrap();
      const expenses = await dispatch(
        expenseApi.endpoints.fetchAllExpenses.initiate({})
      ).unwrap();
      if (categories && Object.keys(categories).length !== 0)
        dispatch(addCategories(categories));
      if (expenses && Object.keys(expenses).length !== 0)
        dispatch(addExpenses(expenses));
    } catch (error) {
      throw new Error(
        `Failed to fetch additional user information: ${error instanceof Error ? error.message : "Unknown error."}`
      );
    }
  },
});
