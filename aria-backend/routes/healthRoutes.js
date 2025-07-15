const express = require("express");
const router = express.Router();
const {
  createHealthLog,
  generateHealthInsight,
} = require("../controllers/healthController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createHealthLog);
router.post("/generate-insight", protect, generateHealthInsight);

module.exports = router;
