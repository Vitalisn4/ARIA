const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: ["Fitbit", "Apple Watch", "Oura", "Garmin", "Phone", "Other"],
      required: true,
    },
    deviceId: { type: String, required: true },
    accessToken: { type: String, required: true },
    refreshToken: { type: String },
    permissions: [{ type: String }],
    lastSync: { type: Date },
  },
  { timestamps: true }
);

deviceSchema.index({ user: 1, deviceId: 1 }, { unique: true });

const Device = mongoose.model("Device", deviceSchema);
module.exports = Device;
