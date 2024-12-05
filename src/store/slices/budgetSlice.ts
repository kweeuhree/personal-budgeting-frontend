import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

import { RESET_STORE_STATE } from "../actions";

interface Budget {
  budgetId: string;
  userId: string;
  checkingBalance: number;
  savingsBalance: number;
  budgetTotal: number;
  budgetRemaining: number;
  totalSpent: number;
  updatedAt: string;
}

export type PartialBudget = Partial<Budget>;

// allow to populate Budget gradually
const initialState: PartialBudget = {};

const budgetSlice = createAppSlice({
  name: "budget",
  initialState,
  reducers: {
    budgetCreate: (
      state: PartialBudget,
      action: PayloadAction<PartialBudget>
    ) => {
      return { ...state, ...action.payload };
    },
    budgetUpdate: (
      state: PartialBudget,
      action: PayloadAction<PartialBudget>
    ) => {
      return { ...state, ...action.payload };
    },
    budgetDelete: () => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_STORE_STATE, () => initialState);
  },
  selectors: {
    selectBudget: (state: PartialBudget): PartialBudget => state,
  },
});

export const { budgetCreate, budgetDelete, budgetUpdate } = budgetSlice.actions;

export const { selectBudget } = budgetSlice.selectors;

export const budgetReducer = budgetSlice.reducer;
