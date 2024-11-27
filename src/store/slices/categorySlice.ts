import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

interface Category {
  categoryId: string;
  name: string;
  description: string;
  totalSum?: number;
}

type Categories = Category[];

const initialState: Categories = [];

const categorySlice = createAppSlice({
  name: "categories",
  initialState,
  reducers: {
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

export const { createCategory, deleteCategory } = categorySlice.actions;

export const { selectCategories, selectSpecificCategory } =
  categorySlice.selectors;

export const categoryReducer = categorySlice.reducer;
