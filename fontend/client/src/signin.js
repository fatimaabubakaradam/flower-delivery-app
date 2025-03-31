import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./signin.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="signin-container">
      <h2>Greetings!</h2>
      <h3>Welcome to Luxury Gift Shop</h3>
      <p>Use your email & password to sign in</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">CONTINUE</button>
      </form>

      <div className="signin-footer">
        <Link to="#">Privacy Policy</Link>
        <span>|</span>
        <Link to="#">Terms and Conditions</Link>
      </div>
    </div>
  );
};

export default SignIn;
