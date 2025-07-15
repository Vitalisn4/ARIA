const asyncHandler = require("express-async-handler");
const HealthService = require("../services/HealthService");
const AIModelService = require("../services/AIModelService");
const HealthLog = require("../models/healthLogModel");

// @desc    Log new health data (e.g., from a device)
// @route   POST /api/health
// @access  Private
const createHealthLog = asyncHandler(async (req, res) => {
  const { type, value, recordedAt, sourceDevice } = req.body;
  if (!type || value === undefined) {
    res.status(400);
    throw new Error("Missing required fields: type and value");
  }

  const logEntry = await HealthService.createLog(req.user._id, {
    type,
    value,
    recordedAt,
    sourceDevice,
  });
  res.status(201).json(logEntry);
});

// @desc    Generate an insight based on recent health data
// @route   POST /api/health/generate-insight
// @access  Private
const generateHealthInsight = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // 1. Fetch recent data
  const recentSleep = await HealthLog.find({ user: userId, type: "Sleep" })
    .sort({ recordedAt: -1 })
    .limit(7);
  const recentStress = await HealthLog.find({ user: userId, type: "Stress" })
    .sort({ recordedAt: -1 })
    .limit(7);

  if (recentSleep.length === 0 && recentStress.length === 0) {
    return res.json({
      insight:
        "There's not enough data to generate an insight yet. Try logging some sleep or stress data.",
    });
  }

  // 2. Formulate a prompt for the AI
  const prompt = `A user has the following health data. Sleep logs (duration in minutes): ${JSON.stringify(
    recentSleep.map((s) => s.value.duration_minutes)
  )}. Stress logs (score 1-10): ${JSON.stringify(
    recentStress.map((s) => s.value)
  )}. Provide one actionable insight.`;

  // 3. Get insight from AI Service
  const insight = await AIModelService.generateInsight(prompt);
  res.json({ insight });
});

module.exports = { createHealthLog, generateHealthInsight };
