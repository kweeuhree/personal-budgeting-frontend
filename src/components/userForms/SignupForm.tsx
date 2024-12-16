import { useForm, SubmitHandler } from "react-hook-form";

import { useSignupMutation } from "../../store";
import { useRedirectBox } from "../../hooks";
import { Button } from "../Button";
import { UserSignUp } from "../../types";

export const SignupForm: React.FC = () => {
  const { formTitle } = useRedirectBox();
  const [signup, { isSuccess, isError, error }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserSignUp>();
  const onSubmit: SubmitHandler<UserSignUp> = (userData) => {
    console.log(userData);
    handleSignup(userData);
  };

  const password = watch("password");

  const handleSignup = async (userData: UserSignUp) => {
    try {
      await signup({
        email: userData.userEmail,
        displayName: userData.displayName,
        password: userData.password,
      }).unwrap();
      reset();
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Unknown error");
    }
  };

  return (
    <form id="signupForm" className="my-10" onSubmit={handleSubmit(onSubmit)}>
      {isSuccess && <p className="success-message">Signed up successfully!</p>}
      {isError && error && (
        <p className="error-message">This email address is already is use</p>
      )}
      <div className="grid space-y-4">
        <label htmlFor="displayName">Display name:</label>
        <input
          id="displayName"
          type="text"
          {...register("displayName", {
            required: "Display name is required",
          })}
        />
        {errors.displayName && <span>{errors.displayName.message}</span>}

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

        <label htmlFor="repeatPassword">Repeat password:</label>
        <input
          id="repeatPassword"
          type="password"
          {...register("repeatPassword", {
            required: "Password is required",
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
        <br />
      </div>
      <Button buttonType="submit" buttonText={formTitle} />
    </form>
  );
};
