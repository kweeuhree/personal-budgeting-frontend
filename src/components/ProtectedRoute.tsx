import { Navigate } from "react-router-dom";

import { useAppSelector } from "../store/hooks";
import { selectAuthStatus } from "../store/slices/";

type ProtectedRouteProps = {
  element: React.ComponentType; // The component that will be rendered
  [key: string]: unknown; // Any additional props
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Element,
  ...props
}) => {
  const isUserAuthorized = useAppSelector(selectAuthStatus);

  return isUserAuthorized ? <Element {...props} /> : <Navigate to="/" />;
};
