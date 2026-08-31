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
      trim: true,
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

const stripPassword = (userDoc) => {
  if (!userDoc) return null;
  const user = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  delete user.password;
  return user;
};

userSchema.statics.signup = async function (name, email, password) {
  if (!name || !email || !password) {
    throw new Error("Name, email, and password are required");
  }

  const trimmedName = String(name).trim();
  const normalizedEmail = String(email).trim().toLowerCase();

  if (!trimmedName) {
    throw new Error("Name is required");
  }

  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    throw new Error("Please enter a valid email address");
  }

  if (String(password).length < 6) {
    throw new Error("Password must be at least 6 characters long");
  }

  const existingUser = await this.findOne({ email: normalizedEmail });
  if (existingUser) throw new Error("Email already registered");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    name: trimmedName,
    email: normalizedEmail,
    password: hashedPassword,
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  const normalizedEmail = String(email || "").trim().toLowerCase();

  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required");
  }

  const user = await this.findOne({ email: normalizedEmail });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign(
    { userId: user._id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { user: stripPassword(user), token };
};

const User = mongoose.model("User", userSchema);
module.exports = User;