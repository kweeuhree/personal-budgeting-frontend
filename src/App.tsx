import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { UnauthorizedLayout, DefaultLayout } from "./layouts";
import { MainPage, NotFoundPage } from "./pages";
import { ProtectedRoute, SignupForm, LoginForm } from "./components";

import "./App.css";
import { useAppDispatch, fetchCsrfToken, setCsrfToken } from "./store";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await dispatch(fetchCsrfToken());
        // console.log(`Token: ${token}`);
        const stringToken = token.toString();
        // console.log(`String token: ${stringToken}`);
        if (stringToken === typeof String) {
          dispatch(setCsrfToken(stringToken));
        } else {
          console.log("Token was not fetched");
        }
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

      <Route path="/auth" element={<DefaultLayout />}>
        <Route index element={<ProtectedRoute element={MainPage} />} />
      </Route>

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
