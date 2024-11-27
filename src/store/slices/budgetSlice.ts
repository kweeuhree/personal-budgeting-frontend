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

// allow to populate Budget gradually
const initialState: Partial<Budget> = {};

const budgetSlice = createAppSlice({
  name: "budget",
  initialState,
  reducers: {
    budgetCreate: (
      state: Partial<Budget>,
      action: PayloadAction<Partial<Budget>>
    ) => {
      return { ...state, ...action.payload };
    },
    budgetUpdate: (
      state: Partial<Budget>,
      action: PayloadAction<Partial<Budget>>
    ) => {
      return { ...state, ...action.payload };
    },
    budgetDelete: () => {
      return { ...initialState };
    },
  },
  selectors: {
    selectBudget: (state: Partial<Budget>): Partial<Budget> => state,
  },
});

export const { budgetCreate, budgetDelete, budgetUpdate } = budgetSlice.actions;

export const { selectBudget } = budgetSlice.selectors;

export const budgetReducer = budgetSlice.reducer;
