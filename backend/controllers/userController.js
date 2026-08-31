const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const stripUserPassword = (user) => {
  if (!user) return null;
  const safeUser = user.toObject ? user.toObject() : { ...user };
  delete safeUser.password;
  return safeUser;
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.signup(name, email, password);
    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      user: stripUserPassword(user),
      token,
    });
  } catch (error) {
    res.status(400).json({ message: error.message || "Registration failed" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await User.login(email, password);
    res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    res.status(400).json({ message: error.message || "Login failed" });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id || req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(stripUserPassword(user));
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile", error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };