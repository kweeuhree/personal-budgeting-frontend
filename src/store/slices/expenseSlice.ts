import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { RESET_STORE_STATE } from "../actions";
import { type Expenses, type Expense } from "../../types";

const initialState: Expenses = [];

const expenseSlice = createAppSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpenses: (state: Expenses, action: PayloadAction<Expenses>) => {
      state.push(...action.payload);
    },
    createExpense: (state: Expenses, action: PayloadAction<Expense>) => {
      state.unshift(action.payload);
    },
    updateExpense: (state: Expenses, action: PayloadAction<Expense>) => {
      state.map((exp) =>
        exp.expenseId === action.payload.expenseId
          ? { ...exp, ...action.payload }
          : exp
      );
    },
    deleteExpense: (state: Expenses, action: PayloadAction<Expense>) => {
      return state.filter((exp) => exp.expenseId !== action.payload.expenseId);
    },
    deleteAllExpenses: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_STORE_STATE, () => initialState);
  },
  selectors: {
    selectAllExpenses: (state: Expenses) => state,
    selectExpense: (state: Expenses, expenseId: string) => {
      return state.find((exp) => exp.expenseId === expenseId);
    },
  },
});

export const {
  createExpense,
  updateExpense,
  deleteExpense,
  addExpenses,
  deleteAllExpenses,
} = expenseSlice.actions;

export const { selectAllExpenses, selectExpense } = expenseSlice.selectors;

export const expenseReducer = expenseSlice.reducer;
