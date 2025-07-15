const express = require("express");
const router = express.Router();
const {
  connectDevice,
  getDevices,
  disconnectDevice,
} = require("../controllers/deviceController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getDevices);

router.post("/connect", protect, connectDevice);

router.route("/:id").delete(protect, disconnectDevice);

module.exports = router;
