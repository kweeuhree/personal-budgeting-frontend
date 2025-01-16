// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import {
  budgetUpdate,
  useAppDispatch,
  useLoginMutation,
  userLogin,
} from "../../store";
import { UserLogIn } from "../../types";
import { useRedirectBox, useToken } from "../../hooks";
import { Button, Loading } from "..";
import { NotFoundPage } from "../../pages";

export const LoginForm: React.FC = () => {
  const { fetchToken, tokenStatus } = useToken();
  const { formTitle } = useRedirectBox();
  const [login, { isLoading, error }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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
      throw new Error(
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Unknown error"
      );
    }
  };

  if (isLoading) {
    return <Loading text="Connecting to remote server" />;
  } else if (error) {
    return <NotFoundPage />;
  } else {
    return (
      <>
        <form
          id="loginForm"
          className="my-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={tokenStatus === "loading" ? "block" : "invisible"}>
            {tokenStatus === "loading" && <Loading />}
          </div>
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
