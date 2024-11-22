import { useLocation } from "react-router-dom";

type RedirectOption = {
  formTitle: string;
  redirectMessage: string;
  path: string;
  buttonText: string;
};

export const useRedirectBox = (): RedirectOption => {
  const location = useLocation();
  const redirectBoxOptions: Record<string, RedirectOption> = {
    "/": {
      formTitle: "Log in",
      redirectMessage: "Do not have an account?",
      path: "/signup",
      buttonText: "Sign up",
    },
    "/signup": {
      formTitle: "Sign up",
      redirectMessage: "Already have an account?",
      path: "/",
      buttonText: "Log in",
    },
  };
  return redirectBoxOptions[location.pathname] || redirectBoxOptions["/"];
};
