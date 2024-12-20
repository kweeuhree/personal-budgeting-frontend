// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  budgetUpdate,
  fetchCsrfToken,
  setCsrfToken,
  useAppDispatch,
  useLoginMutation,
  userLogin,
} from "../../store";
import { UserLogIn } from "../../types";
import { useRedirectBox } from "../../hooks";
import { Button, Loading } from "..";

export const LoginForm: React.FC = () => {
  const { formTitle } = useRedirectBox();
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const dispatch = useAppDispatch();

  const fetchToken = async () => {
    try {
      // destructure the token from dispatch action
      const { payload: token } = await dispatch(fetchCsrfToken());
      dispatch(setCsrfToken(token as string));
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserLogIn>();

  const onSubmit: SubmitHandler<UserLogIn> = (userData) => {
    handleLogin(userData);
    reset();
  };

  const handleLogin = async (userData: UserLogIn) => {
    try {
      await fetchToken();
      const response = await login({
        email: userData.userEmail,
        password: userData.password,
      }).unwrap();
      dispatch(
        userLogin({
          userId: response.userId,
          userEmail: response.email,
          displayName: response.displayName,
        })
      );
      if (response.budget !== null) {
        dispatch(budgetUpdate(response.budget));
      }
      navigate("/budget");
    } catch (error) {
      console.log(error);
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    <div>{error instanceof Error ? error.message : "Unknown error"}</div>;
  } else {
    return (
      <>
        <form
          id="loginForm"
          className="my-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="grid space-y-4">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              {...register("userEmail", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.userEmail && <span>{errors.userEmail.message}</span>}

            <label htmlFor="password">Password:</label>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              })}
            />
            {errors.password && <span>This field is required</span>}
            <br />
          </div>
          <Button buttonType="submit" buttonText={formTitle} />
        </form>
      </>
    );
  }
};
