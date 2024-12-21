import { fetchCsrfToken, setCsrfToken, useAppDispatch } from "../store";

export const useToken = () => {
  const dispatch = useAppDispatch();

  const fetchToken = async () => {
    try {
      // destructure the token from dispatch action
      const { payload: token } = await dispatch(fetchCsrfToken());
      dispatch(setCsrfToken(token as string));
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
  };

  return { fetchToken };
};
