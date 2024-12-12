import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import { useAppDispatch, useLogoutMutation, userLogout } from "../store";
import { Chip } from "../components";

import "./defaultLayout.css";

const centerNavLinks: { [key: string]: string } = {
  expenses: "View expenses",
  "expenses/create": "Create expense+",
  categories: "View categories",
};

const confirmStmt = "Are you sure you want to log out?";

export const DefaultLayout: React.FC = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    if (confirm(confirmStmt)) {
      try {
        logout({});
        dispatch(userLogout());
      } catch (error) {
        throw new Error(
          error instanceof Error ? error.message : "Failed to log out the user"
        );
      }
    }
    return;
  };

  return (
    <div className="flex flex-col min-h-[97vh]">
      <nav className="flex content-center justify-center gap-14 text-base">
        <div className="content-center">
          <NavLink
            to="/budget"
            className={({ isActive }) => (isActive ? "selected" : "unselected")}
          >
            Budget
          </NavLink>
        </div>
        <div className="flex gap-5 content-center">
          {Object.entries(centerNavLinks).map(([path, text]) => (
            <NavLink
              key={text}
              className={({ isActive }) =>
                `content-center ${isActive ? "selected" : "unselected"}`
              }
              to={`/${path}`}
              // ensure that react router differentiates between '/expenses' and '/expenses/create'
              end={path === "expenses"}
            >
              {text}
            </NavLink>
          ))}
        </div>
        <div className="flex gap-5">
          <NavLink
            className={({ isActive }) =>
              `content-center ${isActive ? "selected" : "unselected"}`
            }
            to="/profile"
          >
            Profile
          </NavLink>
          <Chip onClick={handleLogout} text="Log out" />
        </div>
      </nav>
      <main className="content-center mt-20">
        <Outlet />
      </main>
    </div>
  );
};
