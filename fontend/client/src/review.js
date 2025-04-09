import React from "react";
import "./Review.css";
import { FaInstagram, FaPinterest, FaFacebookF, FaTwitter, FaPaperPlane } from "react-icons/fa";

const Review = () => {
  return (
    <div className="footer-container">
      
      <section className="reminder-box">
        <p>
          Remember to offer beautiful flowers from Kyiv LuxeBouquets 
          Valentines Day, Mothers Day, Christmas... <br />
          Reminds you 7 days before. No spam or sharing your address.
        </p>
        <input type="email" placeholder="Your Email" />
        <button className="remind-button">REMIND</button>
      </section>

      <section className="contact-box">
        <h3>Contact Us</h3>
        <p className="contact-label">Address</p>
        <p>15/4 Khreshchatyk Street, Kyiv</p>

        <p className="contact-label">Phone</p>
        <p>+380980099777</p>

        <p className="contact-label">General Enquiry:</p>
        <p>Kiev.Florist.Studio@gmail.com</p>

        <p className="contact-label">Follow Us</p>
        <div className="social-icons">
          <FaInstagram />
          <FaPinterest />
          <FaFacebookF />
          <FaTwitter />
          <FaPaperPlane />
        </div>
      </section>

      <section className="bottom-section">
        <div className="section">
          <h3>Shop</h3>
          <ul>
            <li>All Products</li>
            <li>Fresh Flowers</li>
            <li>Dried Flowers</li>
            <li>Live Plants</li>
            <li>Designer Vases</li>
            <li>Aroma Candles</li>
            <li>Freshener Diffuser</li>
          </ul>
        </div>

        <div className="section-1">
          <h3>Service</h3>
          <ul>
            <li>Flower Subscription</li>
            <li>Wedding & Event Decor</li>
          </ul>
        </div>

       
      </section>
      <section className="about-us">
          <h3>About Us</h3>
          <ul>
            <li>Our story</li>
            <li>Blog</li>
          </ul>
          <ul>
            <li>Shipping & returns</li>
            <li>Terms & conditions</li>
            <li>Privacy policy</li>
          </ul>
        </section>
    </div>
  );
};

export default Review;
