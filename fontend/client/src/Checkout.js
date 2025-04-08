import React from "react";
import "./Checkout.css"; 
import flowersnofall from "./assets/Rectangle.png"; 
import { FaLock } from "react-icons/fa"; 
// import Review from "./review";


const Checkout = () => {
  return (
    <div className="checkout-container">
      <div className="item">
        <img
          src={flowersnofall}
          alt="Beautiful Flower Arrangement"
          className="product-image"
        />
        <div className="details">
          <h3>Snowfall</h3>
          <p>Quantity (1)</p>
        </div>
        <div className="price">$100</div>
      </div>

      <div className="summary">
        <div className="row">
          <span>Subtotal</span>
          <span>$100.00</span>
        </div>
        <div className="row">
          <span>Shipping</span>
          <span className="shipping">Calculated at next step</span>
        </div>
        <div className="row total">
          <span>Total</span>
          <span>$100.00</span>
        </div>
        <div className="secure-checkout">
          <span>Secure Checkout</span>
          <FaLock className="icon" />
        </div>
      </div>

    </div>
  );
};

export default Checkout;
