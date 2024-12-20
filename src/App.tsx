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
  CreateCategoryForm,
} from "./components";

import "./App.css";

function App() {
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
        <Route
          path="create"
          element={<ProtectedRoute element={CreateExpenseForm} />}
        />
      </Route>

      <Route path="/categories" element={<DefaultLayout />}>
        <Route index element={<ProtectedRoute element={CategoriesPage} />} />
        <Route
          path="create"
          element={<ProtectedRoute element={CreateCategoryForm} />}
        />
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
