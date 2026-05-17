import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import AuthContext from "./AuthContext";
import "./App.css";

const SignIn = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Show success for 1.5 seconds then login and navigate
        setTimeout(() => {
          login(data.token);
          navigate("/");
        }, 1500);
      } else {
        setError(data.message || "Invalid credentials. Please check your email and password.");
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      setError("Connection error. Please ensure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center', padding: '80px 40px' }}>
          <FaCheckCircle style={{ fontSize: '4rem', color: '#4caf50', marginBottom: '20px' }} />
          <h2 className="title-display">Sign-In Successful</h2>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '10px' }}>
            Welcome back to LuxeBouquets. Preparing your boutique experience...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ animation: 'fadeUp 0.8s ease' }}>
        <span className="hero-badge" style={{ marginBottom: '15px' }}>Welcome Back</span>
        <h2 className="title-display" style={{ marginBottom: '10px' }}>Sign In</h2>
        <p className="auth-subtitle">Continue your luxury floral journey with us.</p>

        {error && (
          <div style={{ 
            background: 'rgba(255,0,0,0.05)', color: '#d32f2f', 
            padding: '12px', borderRadius: '4px', fontSize: '0.85rem', 
            marginBottom: '20px', textAlign: 'center', border: '1px solid rgba(255,0,0,0.1)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent-gold)', fontSize: '0.9rem' }} />
              <input
                type="email"
                className="luxury-input"
                placeholder="you@example.com"
                style={{ paddingLeft: '25px', color: 'var(--color-dark)', borderBottomColor: 'rgba(0,0,0,0.1)' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent-gold)', fontSize: '0.9rem' }} />
              <input
                type="password"
                className="luxury-input"
                placeholder="••••••••"
                style={{ paddingLeft: '25px', color: 'var(--color-dark)', borderBottomColor: 'rgba(0,0,0,0.1)' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-luxury" style={{ width: '100%' }} disabled={loading}>
            <span>{loading ? "Authenticating..." : "Sign In to Studio"}</span>
          </button>
        </form>

        <p style={{ marginTop: "40px", fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          New to LuxeBouquets? <Link to="/signup" className="auth-link">Create an Account</Link>
        </p>

        <div style={{ 
          marginTop: '40px', paddingTop: '30px', borderTop: '1px solid rgba(0,0,0,0.05)', 
          display: 'flex', gap: '20px', justifyContent: 'center', fontSize: '0.7rem', opacity: 0.5 
        }}>
          <Link to="#" style={{ textDecoration: 'none', color: 'var(--color-dark)' }}>Privacy</Link>
          <Link to="#" style={{ textDecoration: 'none', color: 'var(--color-dark)' }}>Terms</Link>
        </div>
      </div>
      
      <style>{`
        .auth-page .luxury-input::placeholder { color: #ccc; }
        .auth-page .luxury-input:focus { border-bottom-color: var(--color-accent-gold) !important; }
      `}</style>
    </div>
  );
};

export default SignIn;
