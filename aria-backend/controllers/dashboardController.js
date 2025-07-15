// const HealthService = require("../services/HealthService");
// const CognitionService = require("../services/CognitionService"); // Assuming this service exists

// // @desc    Get dashboard summary for a user
// // @route   GET /api/dashboard/summary
// // @access  Private
// exports.getDashboardSummary = async (req, res) => {
//   try {
//     const userId = req.user._id; // From protect middleware

//     // Parallel fetching from different services
//     const [healthSummary, cognitionSummary] = await Promise.all([
//       HealthService.getRecentHealthSummary(userId),
//       // CognitionService.getRecentMood(userId) // Example
//     ]);

//     const summary = {
//       health: healthSummary,
//       cognition: cognitionSummary || { mood: "Not tracked" }, // Default value
//     };

//     res.json(summary);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };


const asyncHandler = require("express-async-handler");
const HealthService = require("../services/HealthService");
const CognitionService = require("../services/CognitionService");

// @desc    Get aggregated summary for the main dashboard
// @route   GET /api/dashboard/summary
// @access  Private
const getDashboardSummary = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch data from different services in parallel for efficiency
  const [healthSummary, cognitionSummary] = await Promise.all([
    HealthService.getRecentHealthSummary(userId),
    CognitionService.getRecentCognitionSummary(userId),
  ]);

  const summary = {
    greeting: `Hello, ${req.user.profile.firstName}`,
    health: healthSummary,
    cognition: cognitionSummary,
  };

  res.json(summary);
});

module.exports = { getDashboardSummary };