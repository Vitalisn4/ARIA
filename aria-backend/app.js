// app.js - CORRECTED

const express = require("express");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// CORRECTED CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:5173", // Your local frontend
    "https://aria-theta.vercel.app", // The deployed frontend URL WITHOUT the trailing slash
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Important for authenticated requests
  optionsSuccessStatus: 200,
};

// Route Imports
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const healthRoutes = require("./routes/healthRoutes");
const deviceRoutes = require("./routes/deviceRoutes");

const app = express();

// Core Middleware
app.use(cors(corsOptions)); // Use the corrected CORS options
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.get("/", (req, res) => {
  res.send("ARIA API is running...");
});

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/devices", deviceRoutes);

// Custom Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

module.exports = app;
