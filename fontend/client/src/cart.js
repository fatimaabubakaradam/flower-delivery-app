import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import Checkout from "./Checkout";
import "./App.css";

const Cart = ({ onClose }) => {
  const [flower, setFlower] = useState(null);
  const [checkout, setCheckout] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    fetch("http://localhost:3000/api/flowers/67e30aff5eff241e26fdb397")
      .then((res) => res.json())
      .then((data) => {
        setFlower({
          ...data,
          imageUrl: `http://localhost:3000${data.image}`,
        });
      })
      .catch((err) => console.error("Error fetching flower:", err));

    const savedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(savedCartItems);
  }, []);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert("You must be signed in to add items to the cart.");
      return;
    }

    const newCartItems = [...cartItems, flower];
    setCartItems(newCartItems);

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));

    alert("Item added to cart!");
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert("You must be signed in to proceed to checkout.");
      return;
    }
    setCheckout(true);
  };

  const handleRemoveFromCart = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);

    localStorage.setItem("cartItems", JSON.stringify(newCartItems));

    alert("Item removed from cart.");
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="cart-container show">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>
      </div>

      {checkout ? (
        <Checkout cartItems={cartItems} total={calculateTotal()} />
      ) : (
        flower && (
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
              <p className="shipping-info">Shipping & taxes calculated at checkout</p>
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!isAuthenticated}
            >
              Add to Cart
            </button>

            <button
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={!isAuthenticated}
            >
              CHECK OUT
            </button>
          </div>
        )
      )}
    </div>
  );
};

export default Cart;
