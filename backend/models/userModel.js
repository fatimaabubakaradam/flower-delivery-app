const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartData: {
      type: Object,
      default: {},
    },
  },
  { minimize: false, timestamps: true }
);
// Static Method for Signup
userSchema.statics.signup = async function (name, email, password) {
  // Check if email already exists
  const existingUser = await this.findOne({ email });
  if (existingUser) throw new Error("Email already registered");
  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  // Create new user
  const user = await this.create({ name, email, password: hashedPassword });
  return user;
};
// Static Method for Login
userSchema.statics.login = async function (email, password) {
  // Find user by email
  const user = await this.findOne({ email });
  if (!user) throw new Error("Invalid email or password");
  // Compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");
  // Generate JWT Token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return { user, token };
};
const User = mongoose.model("User", userSchema);
module.exports = User;