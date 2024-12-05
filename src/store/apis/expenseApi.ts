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
    expenseFetch: builder.query({
      query: (expenseId) => ({
        url: `expenses/view/${expenseId}`,
        method: "GET",
      }),
    }),
    expenseCreate: builder.mutation({
      query: (newExpense) => ({
        url: "expenses/create",
        method: "POST",
        body: newExpense,
      }),
    }),
    expenseUpdate: builder.mutation({
      query: ({ expenseId, updatedExpense }) => ({
        url: `expenses/update/${expenseId}`,
        method: "PUT",
        body: updatedExpense,
      }),
    }),
    expenseDelete: builder.mutation({
      query: (expenseId) => ({
        url: `expenses/delete/${expenseId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useExpenseCreateMutation,
  useExpenseDeleteMutation,
  useExpenseFetchQuery,
  useExpenseUpdateMutation,
  useFetchAllExpensesQuery,
} = expenseApi;
