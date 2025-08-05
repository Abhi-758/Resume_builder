import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="app container">
      <h3>
        Page not found. Go back to the <Link to="/">Home page</Link>.
      </h3>
    </div>
  );
};

export default ErrorPage;
