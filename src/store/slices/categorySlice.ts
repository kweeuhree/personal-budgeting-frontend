import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

import { RESET_STORE_STATE } from "../actions";
import { type Category, Categories } from "../../types";

const initialState: Categories = [];

const categorySlice = createAppSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategories: (state: Categories, action: PayloadAction<Categories>) => {
      state.push(...action.payload);
    },
    createCategory: (state: Categories, action: PayloadAction<Category>) => {
      state.push(action.payload);
    },
    deleteCategory: (state: Categories, action: PayloadAction<string>) => {
      state.filter((cat) => cat.expenseCategoryId !== action.payload);
    },
    incrementCategoryExpenses: (
      state: Categories,
      action: PayloadAction<{
        expenseCategoryId: string;
        amountInCents: number;
      }>
    ) => {
      const { expenseCategoryId, amountInCents } = action.payload;
      const found = state.find(
        (cat) => cat.expenseCategoryId === expenseCategoryId
      );

      if (found) {
        found.totalSum += amountInCents;
      }
    },
    decrementCategoryExpenses: (
      state: Categories,
      action: PayloadAction<{
        expenseCategoryId: string;
        amountInCents: number;
      }>
    ) => {
      const { expenseCategoryId, amountInCents } = action.payload;
      const found = state.find(
        (cat) => cat.expenseCategoryId === expenseCategoryId
      );

      if (found) {
        found.totalSum -= amountInCents;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(RESET_STORE_STATE, () => initialState);
  },
  selectors: {
    selectCategories: (state: Categories): Categories => state,
    selectSpecificCategory: (state: Categories, categoryId: string) => {
      return state.find((cat) => cat.expenseCategoryId === categoryId);
    },
  },
});

export const {
  createCategory,
  deleteCategory,
  addCategories,
  incrementCategoryExpenses,
  decrementCategoryExpenses,
} = categorySlice.actions;

export const { selectCategories, selectSpecificCategory } =
  categorySlice.selectors;

export const categoryReducer = categorySlice.reducer;
