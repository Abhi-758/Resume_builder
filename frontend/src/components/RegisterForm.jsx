import React, { useState } from "react";
import { useNavigate } from "react-router-dom";



// src/components/RegisterForm.jsx (inside handleSubmit or similar)
fetch("http://localhost:5000/api/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    username: formData.username,
    email: formData.email,
    password: formData.password
  }),
})
  .then(res => res.json())
  .then(data => {
    if (data.msg === "User registered") {
      // Redirect to login, show success, etc.
    } else {
      // Handle error (user exists, etc.)
    }
  })
  .catch(err => {
    // Handle network/server error
  });



  
// Simple validation for example
const validate = (data) => {
  const errors = {};
  if (!data.username || data.username.length < 3) {
    errors.username = "Username (min 3 chars) is required.";
  }
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Valid email is required.";
  }
  if (!data.password || data.password.length < 6) {
    errors.password = "Password (min 6 chars) is required.";
  }
  return errors;
};

export default function RegisterForm() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      // Simulate registration (in production, send to backend)
      localStorage.setItem("user", JSON.stringify(formData));
      navigate("/login");
    }
  };

  return (
    <form className="resume-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label className="resume-form__label">
        Username:
        <input className="resume-form__input" name="username" value={formData.username} onChange={handleChange} />
      </label>
      {errors.username && <p className="error-message">{errors.username}</p>}

      <label className="resume-form__label">
        Email:
        <input className="resume-form__input" type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      {errors.email && <p className="error-message">{errors.email}</p>}

      <label className="resume-form__label">
        Password:
        <input className="resume-form__input" type="password" name="password" value={formData.password} onChange={handleChange} />
      </label>
      {errors.password && <p className="error-message">{errors.password}</p>}

      <button className="submit-btn" type="submit">Register</button>
    </form>
  );
}
