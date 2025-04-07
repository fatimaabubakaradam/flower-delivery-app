require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const flowerRoutes = require("./routes/flowerRoutes");
const userRoutes = require("./routes/userRoutes"); // ✅ Import userRoutes

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

// ✅ Middleware
app.use(cors({ origin: "http://localhost:3001", credentials: true })); // Allow frontend on port 3001
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

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
