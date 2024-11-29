import React from "react";
import { Outlet, NavLink } from "react-router-dom";

import { useAppDispatch, useLogoutMutation, userLogout } from "../store";

export const DefaultLayout: React.FC = () => {
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    try {
      logout({});
      dispatch(userLogout());
    } catch (error) {
      throw new Error(error ? error.toString() : "Failed to log out the user");
    }
  };

  return (
    <div>
      <div>
        <nav>
          <div className="nav-left">
            <NavLink to="/budget">Budget</NavLink>
          </div>
          <div className="nav-center">
            <NavLink to="/expenses">View expenses</NavLink>
            <NavLink to="/expenses/create">Create expense +</NavLink>
            <NavLink to="/categories">View categories</NavLink>
          </div>
          <div className="nav-right">
            <NavLink to="/profile">Profile</NavLink>
            <button type="button" onClick={handleLogout}>
              Log out
            </button>
          </div>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
