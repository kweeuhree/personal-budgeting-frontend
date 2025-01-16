import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "..";

export const baseUrl = import.meta.env.VITE_BASE_URL;

const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const sessionCookie = getCookie("session"); // Extract CSRF token from the cookie

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

    if (sessionCookie?.length) headers.set("session", sessionCookie);

    return headers;
  },
});
