import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { UnauthorizedLayout, DefaultLayout } from "./layouts";
import { MainPage, NotFoundPage } from "./pages";
import { ProtectedRoute, SignupForm, LoginForm } from "./components";
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

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
