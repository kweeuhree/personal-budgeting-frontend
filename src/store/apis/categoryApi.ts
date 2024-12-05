import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithCsrf } from "./baseQuery";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: baseQueryWithCsrf,
  endpoints: (builder) => ({
    fetchAllCategories: builder.query({
      query: () => ({
        url: "categories/view",
        method: "GET",
      }),
    }),
    fetchCategoryExpenses: builder.query({
      query: (categoryId) => ({
        url: `categories/expenses/${categoryId}`,
        method: "GET",
      }),
    }),
    categoryCreate: builder.mutation({
      query: (newCategory) => ({
        url: "categories/create",
        method: "POST",
        body: newCategory,
      }),
    }),
    categoryDelete: builder.mutation({
      query: (categoryId) => ({
        url: `categories/delete/${categoryId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCategoryDeleteMutation,
  useCategoryCreateMutation,
  useFetchAllCategoriesQuery,
  useFetchCategoryExpensesQuery,
} = categoryApi;
