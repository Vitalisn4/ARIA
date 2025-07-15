const mongoose = require("mongoose");

const healthLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["HeartRate", "Sleep", "Nutrition", "Activity", "Mood", "Stress"],
    index: true,
  },
  value: { type: mongoose.Schema.Types.Mixed, required: true },
  sourceDevice: { type: mongoose.Schema.Types.ObjectId, ref: "Device" },
  recordedAt: { type: Date, default: Date.now, index: true },
});

const HealthLog = mongoose.model("HealthLog", healthLogSchema);
module.exports = HealthLog;
