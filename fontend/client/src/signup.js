import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import AuthContext from "./AuthContext";
import "./App.css";

const SignUp = () => {
  const { login } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get("redirect") || "/";

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify your confirmation password.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => {
          login(data.token);
          navigate(redirect);
        }, 1500);
      } else {
        setError(data.message || "Registration failed. Please check your information.");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError("Connection error. Please ensure backend is running.");
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
            Join Our Studio
          </span>
          <h2 className="auth-editorial-quote">
            “Flowers are the music of the ground.”
          </h2>
          <p className="auth-editorial-author">Boutique floral member experience</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-split-form">
        <div className="auth-form-card fade-up">
          {success ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <FaCheckCircle style={{ fontSize: '3.5rem', color: '#4caf50', marginBottom: '20px' }} />
              <h2 className="title-display" style={{ fontSize: '1.8rem' }}>Welcome, {name}!</h2>
              <p style={{ color: 'var(--color-text-muted)', marginTop: '10px' }}>
                Your boutique account has been created. Redirecting to checkout...
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '25px' }}>
                <span className="hero-badge" style={{ marginBottom: '10px' }}>New Customer</span>
                <h2 className="title-display" style={{ fontSize: '2rem', marginTop: '6px' }}>Create Account</h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                  Create an account to complete your floral order seamlessly.
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

              <form onSubmit={handleRegister}>
                <div className="form-group-luxe" style={{ marginBottom: '18px' }}>
                  <label>Full Name</label>
                  <div className="input-with-icon">
                    <FaUser className="input-icon" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-luxe" style={{ marginBottom: '18px' }}>
                  <label>Email Address</label>
                  <div className="input-with-icon">
                    <FaEnvelope className="input-icon" />
                    <input
                      type="email"
                      placeholder="jane@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-luxe" style={{ marginBottom: '18px' }}>
                  <label>Password</label>
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group-luxe" style={{ marginBottom: '30px' }}>
                  <label>Confirm Password</label>
                  <div className="input-with-icon">
                    <FaLock className="input-icon" />
                    <input
                      type="password"
                      placeholder="Re-enter password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <span>{loading ? "Creating Profile..." : "Create Account & Continue"}</span>
                </button>
              </form>

              <div style={{ marginTop: '30px', textAlign: 'center', paddingTop: '20px', borderTop: 'var(--border-delicate)' }}>
                <p style={{ fontSize: '0.88rem', color: 'var(--color-text-muted)' }}>
                  Already have an account?{" "}
                  <Link 
                    to={`/signin${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`} 
                    style={{ color: 'var(--color-accent-gold-dark)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    Sign In here <FaArrowRight style={{ fontSize: '0.75rem', marginLeft: '4px' }} />
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

export default SignUp;
