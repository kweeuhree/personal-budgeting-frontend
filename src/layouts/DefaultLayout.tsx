import React from "react";
import { Outlet } from "react-router-dom";

import { NavBar } from ".";

export const DefaultLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-full min-w-full ">
      <NavBar />
      <main className="flex flex-col items-center justify-stretch lg:mt-15 md:mt-15 min-w-full">
        <Outlet />
      </main>
    </div>
  );
};
