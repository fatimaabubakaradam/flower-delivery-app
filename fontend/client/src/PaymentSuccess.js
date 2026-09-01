import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { FaCheckCircle, FaExclamationTriangle, FaArrowRight } from "react-icons/fa";
import { formatDollar } from "./utils/currency";
import "./App.css";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [verificationResult, setVerificationResult] = useState(null);
  const [, setErrorMsg] = useState("");

  const reference = searchParams.get("reference") || searchParams.get("trxref") || searchParams.get("session_id");

  useEffect(() => {
    if (reference) {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      fetch(`${API_URL}/api/payments/paystack/verify/${reference}`)
        .then((res) => res.json())
        .then((resData) => {
          setLoading(false);
          if (resData && resData.status) {
            setVerificationResult(resData.data);
            localStorage.removeItem("cartItems");
            window.dispatchEvent(new Event("cart-updated"));
          } else {
            setErrorMsg(resData.message || "Payment verification failed.");
          }
        })
        .catch((err) => {
          console.error("Verification error:", err);
          setLoading(false);
          setErrorMsg("Could not connect to payment verification service.");
        });
    } else {
      setLoading(false);
      setErrorMsg("No transaction reference provided.");
    }
  }, [reference]);

  if (loading) {
    return (
      <div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '90vh', paddingTop: '160px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '48px', height: '48px', border: '3px solid var(--color-accent-gold)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 24px' }} />
          <h2 className="title-display" style={{ fontSize: '1.5rem' }}>Verifying Transaction</h2>
          <p style={{ color: 'var(--color-text-muted)', marginTop: '8px' }}>
            Securing your Paystack payment verification with the server...
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '90vh', paddingTop: '140px', paddingBottom: '100px' }}>
      <div className="container" style={{ maxWidth: '650px' }}>
        {verificationResult && verificationResult.status === "success" ? (
          /* SUCCESS STATE */
          <div style={{ 
            background: '#ffffff', borderRadius: '12px', padding: '50px 40px', 
            textAlign: 'center', boxShadow: 'var(--shadow-float)', border: '1px solid rgba(0,0,0,0.06)'
          }}>
            <FaCheckCircle style={{ fontSize: '4.5rem', color: '#4CAF50', marginBottom: '20px' }} />
            <span className="hero-badge" style={{ marginBottom: '12px' }}>Payment Verified</span>
            <h1 className="title-display" style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
              Order Confirmed
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '35px' }}>
              Your flowers are on their way to becoming someone's beautiful moment.
            </p>

            <div style={{ 
              background: 'var(--color-bg-secondary)', padding: '25px 30px', 
              borderRadius: '8px', textAlign: 'left', marginBottom: '35px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Transaction Reference</span>
                <strong style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{verificationResult.reference}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Amount Paid</span>
                <strong style={{ color: 'var(--color-dark)', fontSize: '1.1rem' }}>{formatDollar(verificationResult.amount)}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Payment Channel</span>
                <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-accent-gold-dark)' }}>
                  Paystack ({verificationResult.channel || 'Card'})
                </span>
              </div>
            </div>

            <Link to="/" className="btn-luxury" style={{ padding: '16px 36px', textDecoration: 'none' }}>
              <span>Return to Studio <FaArrowRight style={{ marginLeft: '8px' }} /></span>
            </Link>
          </div>
        ) : (
          /* FAILURE STATE */
          <div style={{ 
            background: '#ffffff', borderRadius: '12px', padding: '50px 40px', 
            textAlign: 'center', boxShadow: 'var(--shadow-float)', border: '1px solid rgba(211,47,47,0.15)'
          }}>
            <FaExclamationTriangle style={{ fontSize: '4.5rem', color: '#D32F2F', marginBottom: '20px' }} />
            <span className="hero-badge" style={{ borderColor: 'rgba(211,47,47,0.3)', color: '#D32F2F', marginBottom: '12px' }}>
              Payment Incomplete
            </span>
            <h1 className="title-display" style={{ fontSize: '2.2rem', marginBottom: '12px' }}>
              Payment Unsuccessful
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '35px' }}>
              We couldn't complete your payment. Your order has not been confirmed.
            </p>

            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
              <Link to="/checkout" className="btn-luxury" style={{ padding: '16px 36px', textDecoration: 'none' }}>
                <span>Try Again</span>
              </Link>
              <Link to="/" className="btn-luxury btn-outline" style={{ padding: '16px 36px', textDecoration: 'none' }}>
                <span>Back to Studio</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
