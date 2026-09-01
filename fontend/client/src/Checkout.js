import React, { useState, useEffect, useContext } from "react";
import { FaLock, FaArrowLeft, FaPlus, FaMinus, FaTrashAlt, FaUserCheck } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "./AuthContext";
import { formatDollar } from "./utils/currency";
import "./App.css";

const Checkout = ({ cartItems: propsCartItems, onBack }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState(propsCartItems || []);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);

  useEffect(() => {
    if (!propsCartItems) {
      const savedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
      setCartItems(savedCart);
    }
  }, [propsCartItems]);

  const updateQuantity = (index, delta) => {
    const updated = [...cartItems];
    const newQty = (updated[index].quantity || 1) + delta;
    if (newQty <= 0) {
      updated.splice(index, 1);
    } else {
      updated[index].quantity = newQty;
    }
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const removeItem = (index) => {
    const updated = cartItems.filter((_, i) => i !== index);
    setCartItems(updated);
    localStorage.setItem("cartItems", JSON.stringify(updated));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const calculateTotalDollar = () => {
    return cartItems.reduce((acc, item) => {
      let itemPrice = Number(item.price) || 0;
      if (itemPrice >= 1000) itemPrice = itemPrice / 1000;
      return acc + itemPrice * (item.quantity || 1);
    }, 0);
  };

  const handleProceedToPay = async () => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your basket is empty. Please select a flower first.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!user && !token) {
      setShowAuthPrompt(true);
      return;
    }

    setLoadingPayment(true);
    setAuthError("");

    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await fetch(`${API_URL}/api/payments/paystack/initialize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItems }),
      });

      const data = await response.json();

      if (response.ok && (data.authorization_url || data.url)) {
        window.location.href = data.authorization_url || data.url;
      } else {
        setAuthError(data.message || "Failed to initialize Paystack payment. Please try again.");
      }
    } catch (error) {
      console.error("Paystack Checkout Error:", error);
      setAuthError("Network connection error. Please try again.");
    } finally {
      setLoadingPayment(false);
    }
  };

  const totalDollar = calculateTotalDollar();

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', paddingTop: '120px', paddingBottom: '100px', minHeight: '90vh' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div style={{ animation: 'fadeUp 0.5s ease' }}>
          <button 
            onClick={onBack || (() => navigate(-1))}
            style={{ 
              background: 'none', border: 'none', color: 'var(--color-text-muted)', 
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
              marginBottom: '30px', fontSize: '0.8rem', textTransform: 'uppercase',
              letterSpacing: '0.12em', fontWeight: 600
            }}
          >
            <FaArrowLeft /> Return to Collection
          </button>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '35px' }}>
            <h1 className="title-display" style={{ fontSize: '2.5rem' }}>Checkout</h1>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-accent-gold-dark)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Step 1 of 2
            </span>
          </div>

          {showAuthPrompt && (
            <div style={{ 
              background: '#FFF', border: '2px solid var(--color-accent-gold)', borderRadius: '8px',
              padding: '35px', marginBottom: '40px', boxShadow: 'var(--shadow-float)',
              textAlign: 'center', animation: 'fadeUp 0.4s ease'
            }}>
              <span className="hero-badge" style={{ marginBottom: '12px' }}>Authentication Required</span>
              <h2 className="title-display" style={{ fontSize: '1.8rem', marginTop: '8px', marginBottom: '10px' }}>Before You Continue</h2>
              <p style={{ color: 'var(--color-text-muted)', maxWidth: '500px', margin: '0 auto 25px auto', fontSize: '0.95rem' }}>
                Please create an account or sign in to complete your purchase. Your selected items will remain in your basket.
              </p>

              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link 
                  to="/signin?redirect=/checkout" 
                  className="btn-luxury"
                  style={{ padding: '14px 32px', textDecoration: 'none' }}
                >
                  <span>Sign In</span>
                </Link>
                <Link 
                  to="/signup?redirect=/checkout" 
                  className="btn-luxury btn-outline"
                  style={{ padding: '14px 32px', textDecoration: 'none' }}
                >
                  <span>Create Account</span>
                </Link>
              </div>
            </div>
          )}

          {authError && (
            <div style={{ 
              background: 'rgba(211, 47, 47, 0.08)', color: '#d32f2f', 
              padding: '14px 20px', borderRadius: '6px', fontSize: '0.9rem', 
              marginBottom: '30px', textAlign: 'center', border: '1px solid rgba(211, 47, 47, 0.2)'
            }}>
              {authError}
            </div>
          )}

          {/* Order Summary Card */}
          <div style={{ 
            background: '#ffffff', borderRadius: '8px', padding: '35px', 
            border: 'var(--border-delicate)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
            marginBottom: '30px'
          }}>
            <h2 className="title-display" style={{ fontSize: '1.3rem', marginBottom: '25px', paddingBottom: '15px', borderBottom: 'var(--border-delicate)' }}>
              Order Summary
            </h2>

            <div style={{ marginBottom: '30px' }}>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => {
                  let itemPrice = Number(item.price) || 0;
                  if (itemPrice >= 1000) itemPrice = itemPrice / 1000;
                  const itemTotal = itemPrice * (item.quantity || 1);
                  const imageUrl = item.imageUrl || (item.image?.startsWith('http') ? item.image : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${item.image}`);

                  return (
                    <div key={index} style={{ 
                      display: 'flex', gap: '20px', alignItems: 'center',
                      paddingBottom: '20px', marginBottom: '20px',
                      borderBottom: index < cartItems.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none'
                    }}>
                      <img 
                        src={imageUrl} 
                        alt={item.name} 
                        style={{ width: '80px', height: '90px', objectFit: 'cover', borderRadius: '6px' }}
                      />
                      
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '4px' }}>{item.name}</h3>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                          Unit Price: {formatDollar(item.price)}
                        </p>
                        
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                          <button 
                            onClick={() => updateQuantity(index, -1)}
                            style={{ background: '#F0F0EE', border: 'none', borderRadius: '4px', width: '26px', height: '26px', cursor: 'pointer' }}
                          >
                            <FaMinus style={{ fontSize: '0.65rem' }} />
                          </button>
                          <span style={{ fontSize: '0.9rem', fontWeight: 600, minWidth: '20px', textAlign: 'center' }}>
                            {item.quantity || 1}
                          </span>
                          <button 
                            onClick={() => updateQuantity(index, 1)}
                            style={{ background: '#F0F0EE', border: 'none', borderRadius: '4px', width: '26px', height: '26px', cursor: 'pointer' }}
                          >
                            <FaPlus style={{ fontSize: '0.65rem' }} />
                          </button>
                          
                          <button 
                            onClick={() => removeItem(index)}
                            style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', marginLeft: '15px' }}
                          >
                            <FaTrashAlt style={{ fontSize: '0.85rem' }} />
                          </button>
                        </div>
                      </div>

                      <div style={{ textAlign: 'right', fontWeight: 700, fontSize: '1.1rem', fontFamily: 'var(--font-sans)' }}>
                        {formatDollar(itemTotal)}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '30px 0' }}>Your cart is empty.</p>
              )}
            </div>

            <div style={{ background: 'var(--color-bg-secondary)', padding: '25px', borderRadius: '6px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                <span style={{ fontWeight: 600 }}>{formatDollar(totalDollar)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', fontSize: '0.95rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Boutique Shipping</span>
                <span style={{ color: 'var(--color-accent-gold-dark)', fontWeight: 600 }}>Complimentary</span>
              </div>
              
              <div style={{ 
                display: 'flex', justifyContent: 'space-between', 
                borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '18px',
                fontSize: '1.35rem', fontFamily: 'var(--font-serif)', fontWeight: 600
              }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--color-dark)' }}>{formatDollar(totalDollar)}</span>
              </div>
            </div>
          </div>

          {user ? (
            <div style={{ 
              display: 'flex', alignItems: 'center', gap: '10px', 
              background: 'rgba(203, 162, 88, 0.1)', color: 'var(--color-accent-gold-dark)',
              padding: '14px 20px', borderRadius: '6px', marginBottom: '25px', fontSize: '0.85rem'
            }}>
              <FaUserCheck /> Authenticated as <strong>{user.email}</strong>
            </div>
          ) : null}

          <button 
            className="btn-luxury" 
            style={{ width: '100%', padding: '20px', fontSize: '0.9rem', letterSpacing: '0.12em' }} 
            onClick={handleProceedToPay}
            disabled={cartItems.length === 0 || loadingPayment}
          >
            <span>
              {loadingPayment ? "Connecting to Paystack..." : `Proceed to Pay (${formatDollar(totalDollar)})`}
            </span>
          </button>

          <div style={{ 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.75rem',
            marginTop: '20px', textTransform: 'uppercase', letterSpacing: '0.1em'
          }}>
            <FaLock /> 256-Bit SSL Encrypted Paystack Payment
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
