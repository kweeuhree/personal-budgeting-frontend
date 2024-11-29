import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

interface Budget {
  BudgetId: string;
  UserId: string;
  CheckingBalance: number;
  SavingsBalance: number;
  BudgetTotal: number;
  BudgetRemaining: number;
  TotalSpent: number;
  UpdatedAt: string;
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
    isBudgetNotEmpty: (state: PartialBudget): boolean => state.budgetId !== "",
  },
});

export const { budgetCreate, budgetDelete, budgetUpdate } = budgetSlice.actions;

export const { selectBudget, isBudgetNotEmpty } = budgetSlice.selectors;

export const budgetReducer = budgetSlice.reducer;
