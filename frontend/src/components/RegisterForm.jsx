import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerSchema from "../schemas/registerSchema";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";
import { toast } from "react-toastify";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = registerSchema.safeParse(formData)
      if(!result.success) {
        const fieldErrors = result.error.issues.reduce((acc,err) => {
          acc[err.path[0]] = err.message
          return acc
        },{})
        setErrors(fieldErrors)
      }
      else {
        setErrors({})
        try {
          let res = await axios.post("http://localhost:5000/api/users/register",formData,{withCredentials: true})
          toast.success("Registration Successfull")
          dispatch(setLoggedin(true))
          navigate("/dashboard")
        } catch (error) {
          toast.error(error?.response?.data?.message)
        }
      }
    } catch (error) {
      console.log(error?.response?.data?.message)
    }
  };

  return (
    <form className="resume-form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <label className="resume-form__label">
        Username:
        <input
          className="resume-form__input"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      {errors.username && <p className="error-message">{errors.username}</p>}

      <label className="resume-form__label">
        Email:
        <input
          className="resume-form__input"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      {errors.email && <p className="error-message">{errors.email}</p>}

      <label className="resume-form__label">
        Password:
        <input
          className="resume-form__input"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      {errors.password && <p className="error-message">{errors.password}</p>}

      <button className="submit-btn" type="submit">
        Register
      </button>

      <p>Already have an account? <Link to={'/login'}>Sign in</Link></p>
    </form>
  );
}
