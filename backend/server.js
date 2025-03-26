require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const flowerRoutes = require("./routes/flowerRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Fix: Correct variable name (MONGODB_URI instead of MONGO_URI)
if (!process.env.MONGODB_URI) {
  console.error("ERROR: MONGODB_URI is undefined! Check your .env file.");
  process.exit(1);
}

// ✅ Fix: Ensure MongoDB connects properly
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("❌ ERROR: MongoDB Connection Failed:", err.message);
    process.exit(1);
  });

// ✅ Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ✅ Root Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Flower API!" });
});

// ✅ API Routes
app.use("/api/flowers", flowerRoutes);
 

app.use((req, res, next) => {
  console.log(`📩 Incoming Request: ${req.method} ${req.url}`);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("Files:", req.files || req.file);
  next();
});
 

app.use(express.json()); // Parses JSON bodies
app.use(express.urlencoded({ extended: true })); // Parses URL-encoded bodies
app.use("/uploads", express.static("uploads"));

// ✅ Handle 404 Errors
app.use((req, res) => {
  console.error(`ERROR: 404 - Route not found: ${req.method} ${req.url}`);
  res.status(404).json({ message: "Route not found" });
});

// ✅ Start the Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// http://localhost:5000/api/flowers
// http://localhost:3000/api/flowers