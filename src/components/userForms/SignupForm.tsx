import { useForm, SubmitHandler } from "react-hook-form";
import { UserSignUp } from "../../types";

export const SignupForm: React.FC = () => {
  const { reset } = useForm<UserSignUp>();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserSignUp>();
  const onSubmit: SubmitHandler<UserSignUp> = (data) => {
    console.log(data);
    reset();
  };

  const password = watch("password");

  return (
    <form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="displayName">Display name:</label>
      <input
        id="displayName"
        type="text"
        {...register("displayName", {
          required: "Display name is required",
        })}
      />
      {errors.displayName && <span>{errors.displayName.message}</span>}
      <br />
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
      <label htmlFor="repeatPassword">Repeat password:</label>
      <input
        id="repeatPassword"
        type="password"
        {...register("password", {
          required: "Password is required",
          validate: (value) => value === password || "Passwords do not match",
        })}
      />
      <br />
      {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
    </form>
  );
};
