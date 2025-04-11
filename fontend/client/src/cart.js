import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Checkout from "./Checkout";
import "./App.css";

const Cart = () => {
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
      alert("You must be signed in to proceed to checkout.");
      return;
    }
    setCheckout(true);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-container show">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
      </div>

      {checkout ? (
        <Checkout cartItems={cartItems} total={calculateTotal()} />
      ) : (
        <div className="cart-content">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <div className="cart-item" key={index}>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="flower-image"
                />
                <div className="cart-item-details">
                  <h3 className="flower-name">{item.name}</h3>
                  <p className="quantity">Quantity (1)</p>
                  <p className="price">${item.price}</p>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty.</p>
          )}

          <div className="cart-summary">
            <div className="subtotal">
              <p>Subtotal</p>
              <span>${calculateTotal()}</span>
            </div>
            <input
              type="text"
              placeholder="Gift Message"
              className="gift-message"
            />
            <p className="shipping-info">
              Shipping & taxes calculated at checkout
            </p>
          </div>

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={!isAuthenticated}
          >
            CHECK OUT
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
