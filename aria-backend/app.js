const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const corsOptions = {
  origin: [
    "http://localhost:5173", // Your local frontend
    "https://aria-theta.vercel.app/",
  ],
  optionsSuccessStatus: 200,
};

// Route Imports
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const healthRoutes = require("./routes/healthRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

const app = express();

// Core Middleware
app.use(cors(corsOptions)); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies

// API Routes
app.get("/", (req, res) => {
  res.send("ARIA API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/devices", deviceRoutes);

// Custom Error Handling Middleware
app.use(notFound); // For 404 errors
app.use(errorHandler); // For all other errors

module.exports = app;
