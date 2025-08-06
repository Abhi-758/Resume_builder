import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="app container">
      <h1>Welcome to the Resume Builder</h1>
      <p>
        <Link to="/register">Register</Link> to get started, or{" "}
        <Link to="/login">Login</Link> if you already have an account.
      </p>
    </div>
  );
}
