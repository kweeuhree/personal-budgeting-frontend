import { createListenerMiddleware } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import { categoryApi, expenseApi, authApi } from "./apis";
import {
  addCategories,
  addExpenses,
  budgetDelete,
  deleteAllExpenses,
} from "./slices";
import { resetStoreState } from "./actions";

export const logger = createLogger({
  collapsed: true, // Collapse actions for better readability
  duration: true, // Log the duration of each action
  timestamp: false, // Disable timestamps
  diff: true, // Show the state differences
});

export const listenerMiddleware = createListenerMiddleware();
// Listen for a successful login
listenerMiddleware.startListening({
  matcher: authApi.endpoints.login.matchFulfilled,
  effect: async (_, { dispatch }) => {
    try {
      const categories = await dispatch(
        categoryApi.endpoints.fetchAllCategories.initiate({})
      ).unwrap();
      if (categories.length === 0) {
        return;
      }
      dispatch(addCategories(categories));
      const expenses = await dispatch(
        expenseApi.endpoints.fetchAllExpenses.initiate({})
      ).unwrap();

      if (expenses.length !== 0) dispatch(addExpenses(expenses));
    } catch (error) {
      throw new Error(
        `Failed to fetch additional user information: ${error instanceof Error ? error.message : "Unknown error."}`
      );
    }
  },
});

// Listen for a successful logout
listenerMiddleware.startListening({
  matcher: authApi.endpoints.logout.matchFulfilled,
  effect: (_, { dispatch }) => {
    try {
      dispatch(resetStoreState());
    } catch (error) {
      throw new Error(
        `Failed to fetch additional user information: ${error instanceof Error ? error.message : "Unknown error."}`
      );
    }
  },
});

// Listen for a successful category creation
listenerMiddleware.startListening({
  matcher: categoryApi.endpoints.categoryCreate.matchFulfilled,
  effect: async (_, { dispatch }) => {
    try {
      const categories = await dispatch(
        categoryApi.endpoints.fetchAllCategories.initiate({})
      ).unwrap();
      if (categories.length === 0) {
        return;
      }
      dispatch(addCategories(categories));
    } catch (error) {
      throw new Error(
        `Failed to fetch additional user information: ${error instanceof Error ? error.message : "Unknown error."}`
      );
    }
  },
});

// listen for budget reset and reset expenses
listenerMiddleware.startListening({
  actionCreator: budgetDelete,
  effect: (_, { dispatch }) => {
    dispatch(deleteAllExpenses());
  },
});
