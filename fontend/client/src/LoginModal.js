import React, { useState, useContext } from "react";
import { FaTimes, FaEnvelope, FaLock, FaCheckCircle } from "react-icons/fa";
import AuthContext from "./AuthContext";
import "./App.css";

const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isLoginModalOpen) return null;

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
        setTimeout(() => {
          login(data.token);
          setSuccess(false); // reset for next time
        }, 1200);
      } else {
        setError(data.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card fade-up">
        {!success && (
          <button className="modal-close" onClick={closeLoginModal}>
            <FaTimes />
          </button>
        )}
        
        {success ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <FaCheckCircle style={{ fontSize: '3.5rem', color: '#4caf50', marginBottom: '20px' }} />
            <h2 className="title-display" style={{ fontSize: '1.5rem' }}>Authenticated</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '10px' }}>
              Welcome back. Finalizing your order details...
            </p>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
              <span className="hero-badge">Welcome Back</span>
              <h2 className="title-display" style={{ fontSize: '1.5rem', marginTop: '10px' }}>Sign In</h2>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                Sign in to add items to your basket and complete your purchase.
              </p>
            </div>

            {error && (
              <div style={{ 
                background: 'rgba(255,0,0,0.05)', color: '#d32f2f', 
                padding: '10px', borderRadius: '4px', fontSize: '0.8rem', 
                marginBottom: '20px', textAlign: 'center', border: '1px solid rgba(255,0,0,0.1)'
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group-luxe">
                <label>Email Address</label>
                <div className="input-with-icon">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group-luxe" style={{ marginTop: '20px' }}>
                <label>Password</label>
                <div className="input-with-icon">
                  <FaLock className="input-icon" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                className="btn-luxury" 
                style={{ width: '100%', marginTop: '30px' }}
                disabled={loading}
              >
                <span>{loading ? "Authenticating..." : "Sign In"}</span>
              </button>
            </form>

            <p style={{ marginTop: '30px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
              Don't have an account? <a href="/signup" style={{ color: 'var(--color-accent-gold-dark)', fontWeight: 600 }}>Join the Studio</a>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
