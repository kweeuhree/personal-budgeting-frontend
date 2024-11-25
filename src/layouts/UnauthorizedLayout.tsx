import React from "react";
import { Outlet, Link } from "react-router-dom";

import { useRedirectBox } from "../hooks";

export const UnauthorizedLayout: React.FC = () => {
  const { formTitle, redirectMessage, path, buttonText } = useRedirectBox();
  return (
    <div>
      <header>Welcome to Budgeting App</header>
      <div>{formTitle} form</div>
      <main>
        <Outlet />
      </main>
      <div>{redirectMessage}</div>
      <Link to={path}>
        <button>{buttonText}</button>
      </Link>
    </div>
  );
};
