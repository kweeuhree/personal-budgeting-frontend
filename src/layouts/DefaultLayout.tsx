import { Outlet } from "react-router-dom";

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
        Navigation Bar
        <button type="button" onClick={handleLogout}>
          Log out
        </button>
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
