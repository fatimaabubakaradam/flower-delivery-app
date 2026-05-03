import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./App.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("https://flower-delivery-app-backend.onrender.com/api/users/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Sign in successful!");
        navigate("/");
      } else {
        alert("Login failed: " + data.message);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <span className="about-label">Welcome Back</span>
      <h2>Sign In</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '40px' }}>Access your personalized floral experience.</p>

      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn-luxe" style={{ width: '100%' }} disabled={loading}>
          {loading ? "AUTHENTICATING..." : "CONTINUE"}
        </button>
      </form>

      <p style={{ marginTop: "32px", fontSize: '0.875rem' }}>
        New to LuxeBouquets? <Link to="/signup" style={{ color: 'var(--color-gold)', fontWeight: 600 }}>Create an account</Link>
      </p>

      <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid var(--color-medium-gray)', display: 'flex', gap: '16px', justifyContent: 'center', fontSize: '0.75rem', opacity: 0.6 }}>
        <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>Privacy Policy</Link>
        <span>•</span>
        <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>Terms & Conditions</Link>
      </div>
    </div>
  );
};

export default SignIn;
