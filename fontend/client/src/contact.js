import React from "react";
import "./contact.css";
import { FaInstagram, FaPinterest, FaFacebook, FaTwitter, FaTelegram } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <div className="contact-info">
        <h4>Address</h4>
        <p>15/4 Khreshchatyk Street, Kyiv</p>

        <h4>Phone</h4>
        <p>+380980099777</p>

        <h4>General Enquiry:</h4>
        <p className="email">Kiev.Florist.Studio@gmail.com</p>
      </div>

      <div className="social-media">
        <h3>Follow Us</h3>
        <div className="icons">
          <FaInstagram />
          <FaPinterest />
          <FaFacebook />
          <FaTwitter />
          <FaTelegram />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
