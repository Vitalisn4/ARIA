import React from "react";

const Button = ({ children, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="w-full px-6 py-2 font-semibold text-white bg-cyan-500 rounded-md hover:bg-cyan-600 disabled:bg-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-slate-900"
  >
    {children}
  </button>
);
export default Button;
