import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithCsrf } from "./baseQuery";

export const expenseApi = createApi({
  reducerPath: "expenseApi",
  baseQuery: baseQueryWithCsrf,
  endpoints: (builder) => ({
    fetchAllExpenses: builder.query({
      query: () => ({
        url: `expenses/view`,
        method: "GET",
      }),
    }),
    fetchExpense: builder.query({
      query: (expenseId) => ({
        url: `expenses/view/${expenseId}`,
        method: "GET",
      }),
    }),
    createExpense: builder.mutation({
      query: (newExpense) => ({
        url: "expenses/create",
        method: "POST",
        body: newExpense,
      }),
    }),
    updateExpense: builder.mutation({
      query: ({ expenseId, updatedExpense }) => ({
        url: `expenses/update/${expenseId}`,
        method: "POST",
        body: updatedExpense,
      }),
    }),
    deleteExpense: builder.mutation({
      query: (expenseId) => ({
        url: `expenses/delete/${expenseId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useDeleteExpenseMutation,
  useFetchAllExpensesQuery,
  useFetchExpenseQuery,
  useUpdateExpenseMutation,
} = expenseApi;
