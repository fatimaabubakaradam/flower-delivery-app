import React, { useState, useEffect } from "react";
import { FaTimes, FaShoppingBag, FaTrashAlt } from "react-icons/fa";
import Checkout from "./Checkout";
import "./App.css";

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const [checkout, setCheckout] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  const handleRemoveFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("Please sign in to proceed to checkout.");
      return;
    }
    setCheckout(true);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className={`cart-drawer open`}>
      <div className="cart-header">
        <h2 className="title-display" style={{ fontSize: '1.5rem', margin: 0 }}>Your Basket</h2>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="cart-items">
        {checkout ? (
          <Checkout cartItems={cartItems} total={calculateTotal()} onBack={() => setCheckout(false)} />
        ) : (
          <>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                  />
                  <div className="cart-item-info">
                    <h3 className="cart-item-title" style={{ fontFamily: 'var(--font-serif)' }}>{item.name}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '5px' }}>
                      Quantity: {item.quantity}
                    </p>
                    <p style={{ fontWeight: 600, color: 'var(--color-accent-gold-dark)' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemoveFromCart(index)}
                      style={{ 
                        background: 'none', border: 'none', color: 'var(--color-text-light)', 
                        cursor: 'pointer', fontSize: '0.75rem', marginTop: '10px',
                        display: 'flex', alignItems: 'center', gap: '5px'
                      }}
                    >
                      <FaTrashAlt /> Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <FaShoppingBag style={{ fontSize: '3rem', color: 'var(--color-bg-secondary)', marginBottom: '20px' }} />
                <p style={{ color: 'var(--color-text-muted)' }}>Your basket is currently empty.</p>
              </div>
            )}
          </>
        )}
      </div>

      {!checkout && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </div>
          
          {cartItems.length > 0 && (
            <>
              <textarea
                placeholder="Add a gift message..."
                className="input-elegant"
                style={{ height: '80px', resize: 'none' }}
              />
              <button
                className="btn-luxury"
                style={{ width: '100%' }}
                onClick={handleCheckout}
                disabled={!isAuthenticated}
              >
                <span>{isAuthenticated ? 'Proceed to Checkout' : 'Sign in to Checkout'}</span>
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
