import React, { useState, useEffect } from "react";
import { FaShoppingBag, FaTimes } from "react-icons/fa";
import Checkout from "./Checkout"; 
import "./App.css";

const Cart = ({ onClose }) => { // ✅ Receive `onClose` function
  const [flower, setFlower] = useState(null);
  const [checkout, setCheckout] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/flowers/67e30aff5eff241e26fdb397")
      .then((res) => res.json())
      .then((data) => {
        setFlower({
          ...data,
          imageUrl: `http://localhost:3000${data.image}`,
        });
      })
      .catch((err) => console.error("Error fetching flower:", err));
  }, []);

  return (
    <div className="cart-container show">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="close-btn" onClick={onClose}> {/* ✅ Close Cart when clicked */}
          <FaTimes />
        </button>
      </div>

      {checkout ? (
        <Checkout /> 
      ) : (
        flower && (
          <div className="cart-content">
            <div className="cart-item">
              <img src={flower.imageUrl} alt={flower.name} className="flower-image" />
              <div className="cart-item-details">
                <h3 className="flower-name">{flower.name}</h3>
                <p className="quantity">Quantity (1)</p>
                <p className="price">${flower.price}</p>
                <button className="remove-btn">Remove</button>
              </div>
            </div>
            <div className="cart-summary">
              <div className="subtotal">
                <p>Subtotal</p>
                <span>${flower.price}</span>
              </div>
              <input type="text" placeholder="Gift Message" className="gift-message" />
              <p className="shipping-info">
                Shipping & taxes calculated at checkout
                <br />
                Free standard shipping within Kyiv
              </p>
            </div>

            <button 
              className="checkout-btn" 
              onClick={() => setCheckout(true)}
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
