import React, { useState, useEffect, useContext } from "react";
import { FaLock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import "./App.css";

const Checkout = ({ cartItems: propsCartItems, total: propsTotal, onBack }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState(propsCartItems || []);
  const [total, setTotal] = useState(propsTotal || 0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (!propsCartItems) {
      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(savedCart);
      const calculatedTotal = savedCart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(calculatedTotal);
    }
  }, [propsCartItems]);

  const handlePayment = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await fetch(
        `${apiUrl}/api/payments/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ cartItems }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server error response:", errorText);
        alert("Payment failed. Please try again.");
        return;
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("No payment link was returned. Please try again later.");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container" style={{ paddingTop: '160px', paddingBottom: '100px', maxWidth: '800px' }}>
      <div className="checkout-view" style={{ animation: 'fadeUp 0.5s ease' }}>
        <button 
          onClick={onBack || (() => navigate(-1))}
          style={{ 
            background: 'none', border: 'none', color: 'var(--color-text-muted)', 
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            marginBottom: '30px', fontSize: '0.8rem', textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}
        >
          <FaArrowLeft /> Back to Studio
        </button>

        <h1 className="title-display" style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Secure Checkout</h1>

        <div className="order-summary-list" style={{ marginBottom: '40px' }}>
          {cartItems.map((item, index) => (
            <div key={index} style={{ 
              display: 'flex', justifyContent: 'space-between', marginBottom: '15px',
              fontSize: '0.9rem', color: 'var(--color-text-main)'
            }}>
              <span>{item.name} x {item.quantity}</span>
              <span style={{ fontWeight: 600 }}>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          {cartItems.length === 0 && <p>Your basket is empty.</p>}
        </div>

        <div style={{ 
          background: 'var(--color-bg-secondary)', padding: '30px', 
          borderRadius: '4px', marginBottom: '30px', border: 'var(--border-delicate)'
        }}>
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
            <span style={{ fontWeight: 600 }}>${total.toFixed(2)}</span>
          </div>
          <div className="row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Shipping</span>
            <span style={{ color: 'var(--color-accent-gold-dark)', fontSize: '0.8rem' }}>Free Boutique Delivery</span>
          </div>
          <div className="total-row" style={{ 
            display: 'flex', justifyContent: 'space-between', 
            borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '20px',
            fontSize: '1.25rem', fontFamily: 'var(--font-serif)', fontWeight: 600
          }}>
            <span>Grand Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div style={{ 
          display: 'flex', alignItems: 'center', justifyContent: 'center', 
          gap: '10px', color: 'var(--color-text-light)', fontSize: '0.75rem',
          marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.1em'
        }}>
          <FaLock /> Encrypted Secure Checkout
        </div>

        <button 
          className="btn-luxury" 
          style={{ width: '100%' }} 
          onClick={handlePayment}
          disabled={cartItems.length === 0}
        >
          <span>Complete Purchase</span>
        </button>
      </div>
    </div>
  );
};

export default Checkout;
