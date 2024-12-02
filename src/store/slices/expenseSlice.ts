import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

interface Expense {
  expenseId: string;
  amount: number;
  description: string;
  categoryId: string;
  createdAt: string;
}

type Expenses = Expense[];

const initialState: Expenses = [];

const expenseSlice = createAppSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpenses: (state: Expenses, action: PayloadAction<Expenses>) => {
      state.push(...action.payload);
    },
    createExpense: (state: Expenses, action: PayloadAction<Expense>) => {
      state.push(action.payload);
    },
    updateExpense: (state: Expenses, action: PayloadAction<Expense>) => {
      state.map((exp) =>
        exp.expenseId === action.payload.expenseId
          ? { ...exp, ...action.payload }
          : exp
      );
    },
    deleteExpense: (state: Expenses, action: PayloadAction<string>) => {
      state.filter((exp) => exp.expenseId !== action.payload);
    },
  },
  selectors: {
    selectAllExpenses: (state: Expenses) => state,
    selectExpense: (state: Expenses, expenseId: string) => {
      return state.find((exp) => exp.expenseId === expenseId);
    },
  },
});

export const { createExpense, updateExpense, deleteExpense, addExpenses } =
  expenseSlice.actions;

export const { selectAllExpenses, selectExpense } = expenseSlice.selectors;

export const expenseReducer = expenseSlice.reducer;
