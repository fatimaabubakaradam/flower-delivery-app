import React from "react";
import "./Checkout.css";
import { FaLock } from "react-icons/fa";

const Checkout = ({ cartItems, total }) => {
  const handlePayment = async () => {
    console.log("Proceed to Payment clicked");
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const response = await fetch(
        "https://flower-delivery-app-backend.onrender.com/api/payment/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
      console.log("Server response:", data);

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
    <div className="checkout-container">
      {cartItems.map((item, index) => (
        <div className="item" key={index}>
          <img src={item.imageUrl} alt={item.name} className="product-image" />
          <div className="details">
            <h3>{item.name}</h3>
            <p>Quantity ({item.quantity})</p>
          </div>
          <div className="price">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
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
