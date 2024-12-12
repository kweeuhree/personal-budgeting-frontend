import React from "react";
import { Outlet, Link } from "react-router-dom";

import { useRedirectBox } from "../hooks";

import "./unauthorizedLayout.css";

export const UnauthorizedLayout: React.FC = () => {
  const { redirectMessage, path, buttonText } = useRedirectBox();
  return (
    <div className="unauth-wrapper flex flex-col min-h-[90vh] justify-between">
      <header>
        <h1 className="mb-4">
          Budget{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-amber from-navy">
            Smarter
          </span>
          .
        </h1>
        <h4 className="text-2xl">
          Take control of your finances — your goals are just a plan away!
        </h4>
      </header>

      <main>
        <Outlet />
      </main>

      {/* Redirect box */}
      <div className="flex my-10 justify-center gap-2.5">
        <div>{redirectMessage}</div>
        <Link to={path} className="underline">
          {buttonText}
        </Link>
      </div>
    </div>
  );
};
