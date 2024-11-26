import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithCsrf } from "./baseQuery";
import { removeCsrfToken } from "..";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryWithCsrf,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (credentials) => ({
        url: "users/signup",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "users/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Clear the CSRF token on successful logout
          dispatch(removeCsrfToken());
        } catch {
          console.error("Failed to log out");
        }
      },
    }),
  }),
});

export const { useSignupMutation, useLoginMutation, useLogoutMutation } =
  authApi;
