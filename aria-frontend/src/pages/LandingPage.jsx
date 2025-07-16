import React from "react";
import { Link } from "react-router-dom";
// Corrected: Import motion as before
import { motion } from "framer-motion";
import { BrainCircuit } from "lucide-react";

// Fix: Create explicit PascalCase components from the motion object
const MotionDiv = motion.div;
const MotionP = motion.p;

const LandingPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen text-center p-4 bg-slate-900 overflow-hidden">
    {/* Use the new PascalCase components */}
    <MotionDiv
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex items-center gap-4 mb-8"
    >
      <BrainCircuit className="h-16 w-16 text-cyan-400" />
      <h1 className="text-6xl font-bold text-white tracking-tight">ARIA</h1>
    </MotionDiv>

    <MotionP
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="max-w-2xl text-xl text-slate-300 mb-12"
    >
      Your personal OS for human flourishing. An integrated AI designed to think
      with you, grow with you, and help you thrive.
    </MotionP>

    <MotionDiv
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
    >
      <Link
        to="/register"
        className="px-8 py-4 bg-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-cyan-500/30 hover:bg-cyan-600 transition-all duration-300 transform hover:scale-105"
      >
        Begin Your Journey
      </Link>
    </MotionDiv>
  </div>
);

export default LandingPage;
