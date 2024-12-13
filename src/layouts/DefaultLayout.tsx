import React from "react";
import { Outlet } from "react-router-dom";

import { NavBar } from ".";

export const DefaultLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-[100vh] md:min-h-full min-w-full">
      <NavBar />
      <main className="content-center lg:mt-20 md:mt-15 min-w-full">
        <Outlet />
      </main>
    </div>
  );
};
