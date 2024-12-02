import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

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
    deleteCategory: (state: Categories, action: PayloadAction<Category>) => {
      state.filter((cat) => cat.categoryId !== action.payload.categoryId);
    },
  },
  selectors: {
    selectCategories: (state: Categories): Categories => state,
    selectSpecificCategory: (state: Categories, categoryId: string) => {
      return state.find((cat) => cat.categoryId === categoryId);
    },
  },
});

export const { createCategory, deleteCategory, addCategories } =
  categorySlice.actions;

export const { selectCategories, selectSpecificCategory } =
  categorySlice.selectors;

export const categoryReducer = categorySlice.reducer;
