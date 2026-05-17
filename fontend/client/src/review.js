import React from "react";
import { FaInstagram, FaPinterest, FaFacebookF, FaTwitter, FaPaperPlane } from "react-icons/fa";
import "./Review.css";

const Review = () => {
  return (
    <footer className="footer-container">
      <section className="footer-section reminder-section">
        <h3>Stay Connected</h3>
        <p>
          Get notified about special collections and seasonal arrangements 7 days before.
        </p>
        <div className="reminder-input-group">
          <input type="email" placeholder="Your Email Address" />
          <button className="btn-luxe" style={{ width: '100%' }}>REMIND ME</button>
        </div>
      </section>

      <section className="footer-section">
        <h3>Contact Us</h3>
        
        <p className="footer-label">Address</p>
        <p>15/4 Khreshchatyk Street, Kyiv</p>

        <p className="footer-label">Phone</p>
        <p>+380 98 009 9777</p>

        <p className="footer-label">Inquiries</p>
        <p>studio@luxebouquets.com</p>

        <div className="footer-socials">
          <FaInstagram />
          <FaPinterest />
          <FaFacebookF />
          <FaTwitter />
          <FaPaperPlane />
        </div>
      </section>

      <section className="footer-section">
        <h3>Shop</h3>
        <ul>
          <li>All Products</li>
          <li>Fresh Flowers</li>
          <li>Dried Flowers</li>
          <li>Live Plants</li>
          <li>Designer Vases</li>
          <li>Aroma Candles</li>
        </ul>
      </section>

      <section className="footer-section">
        <h3>About Us</h3>
        <ul>
          <li>Our Story</li>
          <li>Blog</li>
          <li>Shipping & Returns</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
        </ul>
      </section>
    </footer>
  );
};

export default Review;
