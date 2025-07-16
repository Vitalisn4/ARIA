import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/authSlice";
import { BrainCircuit, LogOut } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <header className="bg-slate-800/50 backdrop-blur-sm sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link to="/dashboard" className="flex items-center gap-2">
          <BrainCircuit className="h-8 w-8 text-cyan-400" />
          <span className="text-2xl font-bold text-white">ARIA</span>
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-slate-300 hidden md:block">
            Welcome, {user?.profile?.firstName || "User"}
          </span>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 text-white bg-slate-700 hover:bg-red-600 rounded-md transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
