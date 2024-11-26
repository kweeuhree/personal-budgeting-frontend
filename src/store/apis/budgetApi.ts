import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithCsrf } from "./baseQuery";

export const budgetApi = createApi({
  reducerPath: "budgetApi",
  baseQuery: baseQueryWithCsrf,
  endpoints: (builder) => ({
    fetchBudget: builder.query({
      query: (budgetId: string) => ({
        url: `budget/${budgetId}/view`,
        method: "GET",
      }),
    }),
    createBudget: builder.mutation({
      query: (newBudget) => ({
        url: "budget/create",
        method: "POST",
        body: newBudget,
      }),
    }),
    updateBudget: builder.mutation({
      query: ({ budgetId, updatedBudget }) => ({
        url: `budget/update/${budgetId}`,
        method: "POST",
        body: updatedBudget,
      }),
    }),
    deleteBudget: builder.mutation({
      query: (budgetId) => ({
        url: `budget/delete/${budgetId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useFetchBudgetQuery,
  useCreateBudgetMutation,
  useDeleteBudgetMutation,
  useUpdateBudgetMutation,
} = budgetApi;
