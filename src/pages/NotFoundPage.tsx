import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <button>Go back to home</button>
      </Link>
    </div>
  );
};
