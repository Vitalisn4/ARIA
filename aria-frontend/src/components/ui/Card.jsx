import React from "react";

const Card = ({ icon, title, children }) => (
  <div className="p-6 bg-slate-800 rounded-lg shadow-lg border border-slate-700 h-full">
    <div className="flex items-center gap-3 mb-4">
      <div className="text-cyan-400">{icon}</div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    {children}
  </div>
);
export default Card;
