const express = require("express");
const { registerUser, loginUser, getUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Define routes
router.post("/register", registerUser);
router.post("/signin", loginUser); // ADD THIS
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router; // Move this to the end
