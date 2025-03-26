const User = require("../models/userModel");
// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.signup(name, email, password);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await User.login(email, password);
    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// Gets the User Profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving profile", error: error.message });
  }
};
module.exports = { registerUser, loginUser, getUserProfile };