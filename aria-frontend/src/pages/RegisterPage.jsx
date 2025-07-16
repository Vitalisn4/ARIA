import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, resetError } from "../app/authSlice";
import { motion } from "framer-motion";

// Fix 1: Create an explicit PascalCase component variable for motion
const MotionDiv = motion.div;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (error) {
      console.error("Registration Error:", error);
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
    const { firstName, lastName, email, password } = formData;
    const userData = { profile: { firstName, lastName }, email, password };
    dispatch(register(userData));
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
          Create Your ARIA
        </h2>
        <form className="space-y-6" onSubmit={onSubmit}>
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}
          <div className="flex gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={onChange}
              required
              className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={onChange}
              required
              className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={onChange}
            required
            className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={onChange}
            required
            className="w-full px-4 py-3 bg-slate-700 text-white border border-slate-600 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600 disabled:bg-slate-600 transition-colors"
          >
            {isLoading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>
        <p className="text-center text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-cyan-400 hover:underline"
          >
            Sign In
          </Link>
        </p>
      </MotionDiv>
    </div>
  );
};
export default RegisterPage;
