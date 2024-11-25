import React from "react";
import { Outlet } from "react-router-dom";

export const DefaultLayout: React.FC = () => {
  return (
    <div>
      <div>Navigation Bar</div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
