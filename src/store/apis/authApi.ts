import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "./baseUrl";
import { RootState } from "..";

// fetch csrf token during log in and store in csrf slice
export const baseQueryWithCsrf = fetchBaseQuery({
  baseUrl: `${baseUrl}/api/user`,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const csrfToken = state.csrf.token; // Get CSRF token from the Redux state
    if (csrfToken) {
      headers.set("X-CSRF-Token", csrfToken);
    }
    return headers;
  },
});

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: baseQueryWithCsrf,
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
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
