import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import AuthContext from "./AuthContext";
import "./App.css"; 

const SignUp = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(""); 
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        // Show success for 2 seconds then login and navigate
        setTimeout(() => {
          login(data.token);
          navigate("/");
        }, 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
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
          <h2 className="title-display">Welcome, {name}!</h2>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '10px' }}>
            Your account has been successfully created. Redirecting to our studio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ animation: 'fadeUp 0.8s ease' }}>
        <span className="hero-badge" style={{ marginBottom: '15px' }}>Join Our Studio</span>
        <h2 className="title-display" style={{ marginBottom: '10px' }}>Create Account</h2>
        <p className="auth-subtitle">Join the LuxeBouquets family for an elevated floral experience.</p>

        {error && (
          <div style={{ 
            background: 'rgba(255,0,0,0.05)', color: '#d32f2f', 
            padding: '12px', borderRadius: '4px', fontSize: '0.85rem', 
            marginBottom: '20px', textAlign: 'center', border: '1px solid rgba(255,0,0,0.1)'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <FaUser style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent-gold)', fontSize: '0.9rem' }} />
              <input
                type="text"
                className="luxury-input"
                placeholder="Jane Doe"
                style={{ paddingLeft: '25px', color: 'var(--color-dark)', borderBottomColor: 'rgba(0,0,0,0.1)' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--color-text-muted)' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-accent-gold)', fontSize: '0.9rem' }} />
              <input
                type="email"
                className="luxury-input"
                placeholder="jane@example.com"
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
                placeholder="Minimum 8 characters"
                style={{ paddingLeft: '25px', color: 'var(--color-dark)', borderBottomColor: 'rgba(0,0,0,0.1)' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-luxury" style={{ width: '100%' }} disabled={loading}>
            <span>{loading ? "Creating Profile..." : "Join the Studio"}</span>
          </button>
        </form>

        <p style={{ marginTop: "40px", fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Already a member? <Link to="/signin" className="auth-link">Sign In here</Link>
        </p>
      </div>
      
      <style>{`
        .auth-page .luxury-input::placeholder { color: #ccc; }
        .auth-page .luxury-input:focus { border-bottom-color: var(--color-accent-gold) !important; }
      `}</style>
    </div>
  );
};

export default SignUp;
