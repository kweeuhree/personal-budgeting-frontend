import { createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

import { RESET_STORE_STATE } from "../actions";
import { RootState } from "../store";
import { budgetApi } from "../apis";

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

export const asyncBudgetUpdate = createAsyncThunk(
  "budget/asyncBudgetUpdate",
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const budgetId = state.budget?.budgetId;
    if (!budgetId) throw new Error("No budget ID found");

    const budget = await dispatch(
      budgetApi.endpoints.fetchBudget.initiate(budgetId, { forceRefetch: true })
    ).unwrap();

    if (budget) {
      console.log("Updating with budget:");
      console.log(budget);
      dispatch(budgetUpdate(budget));
    }
  }
);
