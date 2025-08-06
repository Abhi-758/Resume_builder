import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginSchema from "../schemas/loginSchema";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, seterrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let result = loginSchema.safeParse(formData);
      if (!result.success) {
        const fieldErrors = result.error.issues.reduce((acc, err) => {
          acc[err.path[0]] = err.message;
          return acc;
        }, {});
        seterrors(fieldErrors);
      } else {
        seterrors({});
        try {
          let res = await axios.post(
            "http://localhost:5000/api/users/login",
            formData,
            { withCredentials: true }
          );
          toast.success("Login Success");
          dispatch(setLoggedin(true));
          navigate("/dashboard");
        } catch (error) {
          toast.error(error?.response?.data?.message);
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.message);
    }
  };

  return (
    <form className="resume-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label className="resume-form__label">
        Email:
        <input
          className="resume-form__input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
      </label>
      <label className="resume-form__label"> Password: </label>

      <input
        className="resume-form__input"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      {errors.password && <p className="error-message">{errors.password}</p>}

      <button className="submit-btn" type="submit">
        Login
      </button>
    </form>
  );
}
