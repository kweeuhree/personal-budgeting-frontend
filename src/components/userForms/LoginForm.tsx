import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";

import { useLoginMutation, userLogin } from "../../store";
import { UserLogIn } from "../../types";

export const LoginForm: React.FC = () => {
  const [login, { isLoading, error }] = useLoginMutation();
  const { reset } = useForm<UserLogIn>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogIn>();

  const onSubmit: SubmitHandler<UserLogIn> = (userData) => {
    handleLogin(userData);
    reset();
  };

  const handleLogin = async (userData: UserLogIn) => {
    try {
      const response = await login({
        email: userData.userEmail,
        password: userData.password,
      }).unwrap();
      console.log("Login successful:", response);
      dispatch(
        userLogin({ userId: response.userId, userEmail: response.email })
      );
      navigate("/auth");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      {isLoading ? "loading" : error && "error"}
      <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
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
        <br />
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
        <br />
        {errors.password && <span>This field is required</span>}
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
