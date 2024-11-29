import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

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
  selectors: {
    selectBudget: (state: PartialBudget): PartialBudget => state,
  },
});

export const { budgetCreate, budgetDelete, budgetUpdate } = budgetSlice.actions;

export const { selectBudget } = budgetSlice.selectors;

export const budgetReducer = budgetSlice.reducer;
