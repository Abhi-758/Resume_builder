import React from "react";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="app container">
      <h2>404 - Page not found</h2>
      <p>
        Go back to <Link to="/">Home</Link>.
      </p>
    </div>
  );
}
