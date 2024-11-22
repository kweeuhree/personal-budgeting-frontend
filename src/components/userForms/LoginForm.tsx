import { useForm, SubmitHandler } from "react-hook-form";
import { UserLogIn } from "../../types";

export const LoginForm: React.FC = () => {
  const { reset } = useForm<UserLogIn>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogIn>();
  const onSubmit: SubmitHandler<UserLogIn> = (data) => {
    console.log(data);
    reset();
  };

  return (
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
  );
};
