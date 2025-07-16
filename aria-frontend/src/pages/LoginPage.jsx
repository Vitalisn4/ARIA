import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, resetError } from "../app/authSlice";
import { motion } from "framer-motion";

// Fix 1: Create an explicit PascalCase component variable for motion
const MotionDiv = motion.div;

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      // It's good practice to log the error for debugging purposes
      console.error("Login Error:", error);
      // Then reset it so it doesn't show up again on a different page
      dispatch(resetError());
    }
    if (user) {
      navigate("/dashboard");
    }
    // Fix 2: Add the missing 'error' dependency to the array
  }, [user, error, navigate, dispatch]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900">
      {/* Use the new PascalCase component */}
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 space-y-8 bg-slate-800 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center text-white">
          Welcome Back
        </h2>
        <form className="space-y-6" onSubmit={onSubmit}>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            placeholder="Password"
            required
            className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600 disabled:bg-slate-600 transition-colors"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-cyan-400 hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </MotionDiv>
    </div>
  );
};
export default LoginPage;
