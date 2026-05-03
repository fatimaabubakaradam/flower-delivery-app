import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css"; 

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://flower-delivery-app-backend.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Registration successful!");
        navigate("/");
      } else {
        alert("Registration failed: " + data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container fade-in">
      <span className="about-label">Join Our Studio</span>
      <h2>Create Account</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Join the LuxeBouquets family for exclusive perks.</p>

      <form onSubmit={handleRegister}>
        <input
          type="text"
          className="auth-input"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          className="auth-input"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn-luxe" style={{ width: '100%' }}>REGISTER</button>
      </form>

      <p style={{ marginTop: "32px", fontSize: '0.875rem' }}>
        Already have an account? <Link to="/signin" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>Sign in here</Link>
      </p>
    </div>
  );
};

export default SignUp;
