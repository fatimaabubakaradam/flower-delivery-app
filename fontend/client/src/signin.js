import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEnvelope, FaLock, FaCheckCircle, FaArrowRight } from "react-icons/fa";
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
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          login(data.token);
          navigate(redirect);
        }, 1200);
      } else {
        setError(data.message || "Invalid credentials. Please check your email and password.");
      }
    } catch (err) {
      console.error("Sign-in error:", err);
      setError("Connection error. Please check your backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-split-wrapper">
      {/* Left Editorial Panel */}
      <div className="auth-split-editorial">
        <div className="auth-editorial-content">
          <span className="hero-badge" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)', marginBottom: '15px' }}>
            Vista Luxury Botanicals
          </span>
          <h2 className="auth-editorial-quote">
            “Your moments deserve flowers.”
          </h2>
          <p className="auth-editorial-author">Hand-curated floral design studio</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-split-form">
        <div className="auth-form-card fade-up">
          {success ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <FaCheckCircle style={{ fontSize: '3.5rem', color: '#4caf50', marginBottom: '20px' }} />
              <h2 className="title-display" style={{ fontSize: '1.8rem' }}>Welcome Back</h2>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '10px' }}>
                Authentication successful. Returning to your checkout...
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '30px' }}>
                <span className="hero-badge" style={{ marginBottom: '10px' }}>Member Portal</span>
                <h2 className="title-display" style={{ fontSize: '2rem', marginTop: '6px' }}>Sign In</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  Sign in to continue your flower purchase and order tracking.
                </p>
              </div>

              {error && (
                <div style={{ 
                  background: 'rgba(211, 47, 47, 0.08)', color: '#d32f2f', 
                  padding: '12px', borderRadius: '4px', fontSize: '0.85rem', 
                  marginBottom: '25px', textAlign: 'center', border: '1px solid rgba(211, 47, 47, 0.2)'
                }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-group-luxe" style={{ marginBottom: '22px' }}>
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

                <div className="form-group-luxe" style={{ marginBottom: '30px' }}>
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
                  style={{ width: '100%', padding: '16px' }}
                  disabled={loading}
                >
                  <span>{loading ? "Authenticating..." : "Sign In to Continue"}</span>
                </button>
              </form>

              <div style={{ marginTop: '35px', textAlign: 'center', paddingTop: '25px', borderTop: 'var(--border-delicate)' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Don't have an account?{" "}
                  <Link 
                    to={`/signup${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} 
                    style={{ color: 'var(--color-accent-gold-dark)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Create an Account <FaArrowRight style={{ fontSize: '0.75rem', marginLeft: '4px' }} />
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
