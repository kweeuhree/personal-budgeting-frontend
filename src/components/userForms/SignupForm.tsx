import { useForm, SubmitHandler } from "react-hook-form";
import { UserSignUp } from "../../types";
import { useSignupMutation } from "../../store";

export const SignupForm: React.FC = () => {
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
      throw new Error("Failed to sign up");
    }
  };

  return (
    <form id="signupForm" onSubmit={handleSubmit(onSubmit)}>
      {isSuccess && <p className="success-message">Signed up successfully!</p>}
      {isError && error && (
        <p className="error-message">This email address is already is use</p>
      )}
      <label htmlFor="displayName">Display name:</label>
      <input
        id="displayName"
        type="text"
        {...register("displayName", {
          required: "Display name is required",
        })}
      />
      <br />
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
      <br />
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
        {...register("repeatPassword", {
          required: "Password is required",
          validate: (value) => value === password || "Passwords do not match",
        })}
      />
      <br />
      {errors.repeatPassword && <span>{errors.repeatPassword.message}</span>}
      <br />
      <button type="submit">Sign up</button>
    </form>
  );
};
