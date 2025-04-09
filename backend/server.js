require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const flowerRoutes = require("./routes/flowerRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Check MongoDB URI
if (!process.env.MONGODB_URI) {
  console.error("❌ ERROR: MONGODB_URI is undefined! Check your .env file.");
  process.exit(1);
}

// ✅ Connect to MongoDB
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

// ✅ CORS Configuration (allow both local and production origins)
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'http://localhost:3001', // Local development URL
      'https://flower-delivery-app-fontend-client.onrender.com', // Production frontend URL
    ];

    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Allow the request
    } else {
      console.log(`Blocked by CORS: ${origin}`);
      callback(new Error('CORS policy does not allow this origin'), false); // Reject the request
    }
  },
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  credentials: true,
};

// Apply CORS middleware
app.use(cors(corsOptions));

// ✅ Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads")); // Serve images from the "uploads" folder

// ✅ Root route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Flower API!" });
});

// ✅ API Routes
app.use("/api/flowers", flowerRoutes);
app.use("/api/users", userRoutes); // ✅ Use this for register, login, profile

// ✅ Logging incoming requests
app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});

// ✅ 404 Error handler
app.use((req, res) => {
  console.error(`❌ 404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
