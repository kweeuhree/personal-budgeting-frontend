import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { UnauthorizedLayout, DefaultLayout } from "./layouts";
import {
  MainPage,
  ExpensesPage,
  CategoriesPage,
  ProfilePage,
  NotFoundPage,
} from "./pages";
import {
  ProtectedRoute,
  SignupForm,
  LoginForm,
  CreateExpenseForm,
} from "./components";
import { useAppDispatch, fetchCsrfToken, setCsrfToken } from "./store";

import "./App.css";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        // destructure the token from dispatch action
        const { payload: token } = await dispatch(fetchCsrfToken());
        dispatch(setCsrfToken(token));
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };

    fetchToken();
  }, [dispatch]);

  return (
    <Routes>
      {/* not protected routes */}
      <Route path="/" element={<UnauthorizedLayout />}>
        <Route index element={<LoginForm />} />
        <Route path="signup" element={<SignupForm />} />
      </Route>

      {/* protected routes */}

      <Route path="/budget" element={<DefaultLayout />}>
        <Route index element={<ProtectedRoute element={MainPage} />} />
      </Route>

      <Route path="/expenses" element={<DefaultLayout />}>
        <Route index element={<ProtectedRoute element={ExpensesPage} />} />
        <Route path="/expenses/create" element={<CreateExpenseForm />} />
      </Route>

      <Route path="/categories" element={<DefaultLayout />}>
        <Route index element={<ProtectedRoute element={CategoriesPage} />} />
      </Route>

      <Route path="/profile" element={<DefaultLayout />}>
        <Route index element={<ProtectedRoute element={ProfilePage} />} />
      </Route>

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
