import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "..";

export const baseUrl = import.meta.env.VITE_BASE_URL;

// fetch csrf token during log in and store in csrf slice
export const baseQueryWithCsrf = fetchBaseQuery({
  baseUrl: `${baseUrl}/api/`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const csrfToken = state.csrf.token; // Get CSRF token from the Redux state
    if (csrfToken) {
      headers.set("X-CSRF-Token", csrfToken);
    }
    headers.set("Content-Type", "application/json");
    console.log("Sending request with following headers:");
    console.log(headers);
    return headers;
  },
  fetchFn: async (url, options) => {
    console.log("Request URL:", url);
    return fetch(url, options).then((response) => {
      console.log("Response:", response);
      return response;
    });
  },
});
