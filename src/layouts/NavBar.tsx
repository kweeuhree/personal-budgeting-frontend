import { NavLink } from "react-router-dom";

import "./navBar.css";

const centerNavLinks: { [key: string]: string } = {
  expenses: "View expenses",
  "expenses/create": "Create expense+",
  categories: "View categories",
};

export const NavBar = () => {
  const isNavLinkHidden = (text: string) => {
    if (
      text === centerNavLinks.expenses ||
      text === centerNavLinks.categories
    ) {
      return true;
    }
  };

  return (
    <nav className="sticky top-0 z-10 flex justify-around min-w-full lg:gap-14 sm:gap-3 mb-10 sm:mb-6  lg:p-8 md:p-4 sm:p-1 text-lg sm:text-md">
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
              `${isNavLinkHidden(text) ? "hidden md:block lg:block" : "block"} ${
                isActive ? "selected" : "unselected"
              }`
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
      </div>
    </nav>
  );
};
