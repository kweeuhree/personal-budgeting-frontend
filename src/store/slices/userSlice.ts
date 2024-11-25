import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";

import {
  type User,
  type UserLogIn,
  type UserSignUp,
  initUserState,
} from "../../types";

const userSlice = createAppSlice({
  name: "user",
  initialState: initUserState,
  reducers: {
    userSignup: (state: User, action: PayloadAction<UserSignUp>) => {
      const { userId, userEmail, createdAt } = action.payload;
      state.userId = userId;
      state.userEmail = userEmail;
      state.createdAt = createdAt;
    },
    userLogin: (state: User, action: PayloadAction<UserLogIn>) => {
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
      state.isAuthenticated = true;
    },
    userLogout: () => {
      return { ...initUserState };
    },
  },
  selectors: {
    selectAuthStatus: (state: User): boolean => state.isAuthenticated,
    selectUser: (state: User): User => state,
  },
});

export const { userLogin, userLogout } = userSlice.actions;

export const { selectUser, selectAuthStatus } = userSlice.selectors;

export const userReducer = userSlice.reducer;
