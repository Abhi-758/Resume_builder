import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();




  // src/components/LoginForm.jsx (inside handleSubmit or similar)
fetch("http://localhost:5000/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    email: formData.email,
    password: formData.password,
  }),
})
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      // Save token, log in user, etc.
      localStorage.setItem("token", data.token);
      // Redirect to dashboard/home
    } else {
      // Handle error (invalid credentials)
    }
  })
  .catch(err => {
    // Handle network/server error
  });


  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const regUser = JSON.parse(localStorage.getItem("user"));
    // Simple email/password check (use backend in production)
    if (!formData.email || !formData.password) {
      setError("All fields required.");
    } else if (!regUser || regUser.email !== formData.email || regUser.password !== formData.password) {
      setError("Invalid credentials.");
    } else {
      setError("");
      // Mark user as logged in (use a real auth/system in production)
      localStorage.setItem("loggedIn", "true");
      navigate("/dashboard");
    }
  };

  return (
    <form className="resume-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label className="resume-form__label">
        Email:
        <input className="resume-form__input" type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label className="resume-form__label">
        Password:
        <input className="resume-form__input" type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      {error && <p className="error-message">{error}</p>}
      <button className="submit-btn" type="submit">Login</button>
    </form>
  );
}
