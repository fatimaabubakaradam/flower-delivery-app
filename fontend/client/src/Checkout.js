import React from "react";
import "./Checkout.css";
import { FaLock } from "react-icons/fa";

const Checkout = ({ cartItems, total }) => {
  const handlePayment = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItems }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="checkout-container">
      {cartItems.map((item, index) => (
        <div className="item" key={index}>
          <img
            src={item.imageUrl}
            alt={item.name}
            className="product-image"
          />
          <div className="details">
            <h3>{item.name}</h3>
            <p>Quantity (1)</p>
          </div>
          <div className="price">${(item.price ?? 0).toFixed(2)}</div>
        </div>
      ))}

      <div className="summary">
        <div className="row">
          <span>Subtotal</span>
          <span>${(total ?? 0).toFixed(2)}</span>
        </div>
        <div className="row">
          <span>Shipping</span>
          <span className="shipping">Calculated at next step</span>
        </div>
        <div className="row total">
          <span>Total</span>
          <span>${(total ?? 0).toFixed(2)}</span>
        </div>
        <div className="secure-checkout">
          <span>Secure Checkout</span>
          <FaLock className="icon" />
        </div>
        <button className="checkout-btn" onClick={handlePayment}>
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default Checkout;
