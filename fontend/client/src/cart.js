import React, { useState, useEffect } from "react";
import { FaTimes, FaShoppingBag, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { formatDollar } from "./utils/currency";
import "./App.css";

const Cart = ({ onClose }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  const handleRemoveFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  const calculateTotalDollar = () => {
    return cartItems.reduce((total, item) => {
      let itemPrice = Number(item.price) || 0;
      if (itemPrice >= 1000) itemPrice = itemPrice / 1000;
      return total + itemPrice * (item.quantity || 1);
    }, 0);
  };

  return (
    <div className="cart-drawer open">
      <div className="cart-header">
        <h2 className="title-display" style={{ fontSize: '1.5rem', margin: 0 }}>Your Basket</h2>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => {
            let itemPrice = Number(item.price) || 0;
            if (itemPrice >= 1000) itemPrice = itemPrice / 1000;
            const itemTotal = itemPrice * (item.quantity || 1);

            return (
              <div className="cart-item" key={index}>
                <img
                  src={item.imageUrl || (item.image?.startsWith('http') ? item.image : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${item.image}`)}
                  alt={item.name}
                />
                <div className="cart-item-info">
                  <h3 className="cart-item-title" style={{ fontFamily: 'var(--font-serif)' }}>{item.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginBottom: '5px' }}>
                    Quantity: {item.quantity || 1}
                  </p>
                  <p style={{ fontWeight: 600, color: 'var(--color-dark)' }}>
                    {formatDollar(itemTotal)}
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
            );
          })
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <FaShoppingBag style={{ fontSize: '3rem', color: 'var(--color-bg-secondary)', marginBottom: '20px' }} />
            <p style={{ color: 'var(--color-text-muted)' }}>Your basket is currently empty.</p>
          </div>
        )}
      </div>

      <div className="cart-footer">
        <div className="cart-total">
          <span>Total</span>
          <span>{formatDollar(calculateTotalDollar())}</span>
        </div>
        
        {cartItems.length > 0 && (
          <button
            className="btn-luxury"
            style={{ width: '100%', marginTop: '15px' }}
            onClick={handleCheckout}
          >
            <span>Proceed to Checkout</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Cart;
