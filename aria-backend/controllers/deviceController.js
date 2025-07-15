const asyncHandler = require("express-async-handler");
const Device = require("../models/deviceModel");
const User = require("../models/userModel");

// @desc    Connect a new device
// @route   POST /api/devices/connect
// @access  Private
const connectDevice = asyncHandler(async (req, res) => {
  const { type, deviceId, accessToken, refreshToken, permissions } = req.body;
  const userId = req.user._id;

  if (!type || !deviceId || !accessToken) {
    res.status(400);
    throw new Error("Missing required fields: type, deviceId, accessToken");
  }

  const existingDevice = await Device.findOne({
    user: userId,
    deviceId: deviceId,
  });
  if (existingDevice) {
    existingDevice.accessToken = accessToken;
    if (refreshToken) existingDevice.refreshToken = refreshToken;
    if (permissions) existingDevice.permissions = permissions;
    await existingDevice.save();
    return res.status(200).json(existingDevice);
  }

  const device = await Device.create({
    user: userId,
    type,
    deviceId,
    accessToken,
    refreshToken,
    permissions,
  });

  await User.findByIdAndUpdate(userId, { $addToSet: { devices: device._id } });

  res.status(201).json(device);
});

// @desc    Get all connected devices for a user
// @route   GET /api/devices
// @access  Private
const getDevices = asyncHandler(async (req, res) => {
  const devices = await Device.find({ user: req.user._id });
  res.json(devices);
});

// @desc    Disconnect a device
// @route   DELETE /api/devices/:id
// @access  Private
const disconnectDevice = asyncHandler(async (req, res) => {
  const device = await Device.findById(req.params.id);

  if (device && device.user.toString() === req.user._id.toString()) {
    await device.deleteOne();
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { devices: device._id },
    });
    res.json({ message: "Device removed successfully" });
  } else {
    res.status(404);
    throw new Error("Device not found or user not authorized");
  }
});

module.exports = { connectDevice, getDevices, disconnectDevice };
