import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import registerSchema from "../schemas/registerSchema";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedin } from "../redux/reducers/UserReducer";
import { toast } from "react-toastify";

import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/config";

import { ArrowLeft, Eye, EyeOff, Mail, Lock, User, Github, CheckCircle } from 'lucide-react';


export default function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false)


  let {isLoggedin} = useSelector(state => state.user)

  useEffect(() => {
    if(isLoggedin) {
      return navigate("/dashboard")
    }
    return navigate("/register")
  },[])
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function onBack() {
    navigate("/")
  }

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

  async function handleGoogleSignUp() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("User Info:", result.user); // user object
      dispatch(setLoggedin(true))
      toast.success("Google auth successfull")
      navigate("/dashboard")
    } catch (error) {
      console.error("Google Sign-in Error:", error);
    }
  }

  return (
     <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full space-y-8">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to home</span>
        </button>

        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 p-3 rounded-full">
              <User className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
          <p className="text-slate-400">Join thousands of professionals building better resumes</p>
        </div>

        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-slate-300 mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                
                value={formData.username}
                onChange={handleChange}
                className="block w-full px-3 py-3 border border-slate-600 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="Enter Your Name"
              />
              {
                errors.username && <p className="text-sm text-red-500">{errors.username}</p>
              }
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-600 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter Your Email"
                />
                {
                  errors.email && <p className="text-sm text-red-500">{errors.email}</p>
                }
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-slate-600 rounded-lg bg-slate-800 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="h-5 w-5 text-slate-400 hover:text-slate-300" />
                  ) : (
                    <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-300" />
                  )}
                </button>
                  {
                    errors.password && <p className="text-sm text-red-500">{errors.password}</p>
                  }
              </div>
              
              
            </div>

           
          </div>

        

          {/* Submit Button */}
          <button
            type="submit"
            
            className={`group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white transition-all transform hover:scale-[1.02] bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
            `}
          >
            Create your account
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-900 text-slate-400">Or sign up with</span>
            </div>
          </div>

          {/* Social Registration */}
          <div className="grid grid-cols-2 gap-3">
            {/* <button
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-slate-600 rounded-lg bg-slate-800 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="ml-2">GitHub</span>
            </button> */}
            <button
              onClick={handleGoogleSignUp}
              type="button"
              className="w-[440px] inline-flex justify-center py-3 px-4 border border-slate-600 rounded-lg bg-slate-800 text-sm font-medium text-slate-300 hover:bg-slate-700 transition-colors"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="ml-2">Google</span>
            </button>
          </div>
        </form>

        {/* Sign In Link */}
        <div className="text-center">
          <p className="text-slate-400">
            Already have an account?{' '}
            <button
              onClick={() => navigate("/login")}
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
