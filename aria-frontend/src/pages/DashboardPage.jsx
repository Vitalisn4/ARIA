import React, { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/layout/Navbar";
import HealthCard from "../components/dashboard/HealthCard";
import CognitionCard from "../components/dashboard/CognitionCard";
import InsightGenerator from "../components/dashboard/InsightGenerator";
import { AnimatePresence, motion } from "framer-motion";

// Fix 1: Create explicit PascalCase component variables
const MotionDiv = motion.div;
const MotionH1 = motion.h1;

const DashboardPage = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get("/dashboard/summary");
        setSummary(response.data);
      } catch (err) {
        // This `err` variable is now used below
        setError("Failed to load dashboard data.");
        // Fix 2: Log the actual error for debugging
        console.error("Error fetching dashboard summary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []); // The empty dependency array is correct here, as it should only run once on mount.

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <Navbar />
      <main className="container mx-auto p-4 md:p-6">
        <AnimatePresence>
          {loading ? (
            <MotionDiv
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-[calc(100vh-80px)] text-cyan-400"
            >
              Loading Dashboard...
            </MotionDiv>
          ) : error ? (
            <MotionDiv
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-[calc(100vh-80px)] text-red-500"
            >
              {error}
            </MotionDiv>
          ) : (
            <>
              <MotionH1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl md:text-4xl font-bold text-white mb-8"
              >
                {summary?.greeting}
              </MotionH1>
              <MotionDiv
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <MotionDiv variants={itemVariants}>
                  <HealthCard healthData={summary?.health} />
                </MotionDiv>
                <MotionDiv variants={itemVariants}>
                  <CognitionCard cognitionData={summary?.cognition} />
                </MotionDiv>
                <MotionDiv variants={itemVariants}>
                  <InsightGenerator />
                </MotionDiv>
              </MotionDiv>
            </>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};
export default DashboardPage;
