import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../apis";

const csrfSlice = createAppSlice({
  name: "csrf",
  initialState: {
    token: "",
    status: "idle",
    error: "",
  },
  reducers: {
    setCsrfToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.status = "active";
    },
    removeCsrfToken: () => {
      return { token: "", status: "idle", error: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCsrfToken.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCsrfToken.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload;
      })
      .addCase(fetchCsrfToken.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message as string;
      });
  },
  selectors: {
    selectToken: (state) => state.token,
  },
});

export const { setCsrfToken, removeCsrfToken } = csrfSlice.actions;

export const { selectToken } = csrfSlice.selectors;

export const csrfReducer = csrfSlice.reducer;

export const fetchCsrfToken = createAsyncThunk("csrf/fetchToken", async () => {
  const response = await fetch(`${baseUrl}/csrf-token`);
  const data = await response.json();
  return data.csrf_token;
});
