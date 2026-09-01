require("dotenv").config();  // Load environment variables from .env file
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const flowerRoutes = require("./routes/flowerRoutes");
const userRoutes = require("./routes/userRoutes");
const paymentRoutes = require("./routes/paymentRoutes");  // Import payment routes

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ MongoDB Connection
if (!process.env.MONGODB_URI) {
  console.error("❌ ERROR: MONGODB_URI is undefined! Check your .env file.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// ✅ CORS Configuration
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:3002',
      'http://127.0.0.1:3000',
      'http://127.0.0.1:3001',
      'https://flower-delivery-app-fontend-client.onrender.com',
    ];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin || origin.startsWith('http://localhost') || origin.startsWith('http://127.0.0.1')) {
      callback(null, true);
    } else {
      console.log(`Blocked by CORS: ${origin}`);
      callback(new Error('CORS policy does not allow this origin'), false);  // Reject the request
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true,
};

// ✅ Apply CORS middleware
app.use(cors(corsOptions)); // Apply the CORS options defined earlier

// ✅ Apply other middleware
app.use(express.json());  // To parse JSON request bodies
app.use(express.urlencoded({ extended: true }));  // To parse URL-encoded data
app.use("/uploads", express.static("uploads"));  // Serve images from "uploads" folder

// ✅ Logging middleware
app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Flower API!" });
});

// ✅ Register API routes
app.use("/api/payments", paymentRoutes);  // Payment routes for Stripe
app.use("/api/flowers", flowerRoutes);  // Flower routes
app.use("/api/users", userRoutes);  // User routes (register, login, etc.)

// ✅ 404 Error handler (if no route matched)
app.use((req, res) => {
  console.error(`❌ 404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
