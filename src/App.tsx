import { Routes, Route } from "react-router-dom";

import { UnauthorizedLayout, DefaultLayout } from "./layouts";
import { MainPage, NotFoundPage } from "./pages";
import { ProtectedRoute, SignupForm, LoginForm } from "./components";

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

      <Route path="/auth" element={<DefaultLayout />}>
        <Route index element={<ProtectedRoute element={MainPage} />} />
      </Route>

      {/* Catch-all for undefined routes */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
