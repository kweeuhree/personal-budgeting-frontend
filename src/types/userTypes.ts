export type User = {
  userId: string;
  userEmail: string;
  createdAt: string;
  displayName: string;
  isAuthenticated: boolean;
  flash: string;
};

export const initUserState: User = {
  userId: "",
  userEmail: "",
  createdAt: "",
  displayName: "",
  isAuthenticated: false,
  flash: "",
};

export type UserSignUp = {
  userId: string;
  userEmail: string;
  password: string;
  repeatPassword: string;
  displayName: string;
  createdAt: string;
};

export type UserLogIn = {
  userId: string;
  userEmail: string;
  displayName: string;
  password?: string;
};
