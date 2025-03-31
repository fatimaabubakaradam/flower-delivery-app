import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaShoppingBag,
  FaInstagram,
  FaPinterest,
  FaFacebook,
  FaTwitter,
  FaTelegram,
} from "react-icons/fa";

import "./App.css";
import "./signin.css";

const MobileMenu = ({ onCartClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Header with menu and cart icons */}
      <header className="nav-container">
        <button className="menu-icon" onClick={() => setIsOpen(true)}>
          <FaBars />
        </button>
        <button className="cart-icon" onClick={onCartClick}>
          <FaShoppingBag />
        </button>
      </header>

      {/* Mobile Menu */}
      <nav className={`mobile-menu ${isOpen ? "show" : ""}`}>
        <button className="close-icon" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>
        <ul>
          <li>
            <Link to="/signin" onClick={() => setIsOpen(false)}>
              Sign in
            </Link>
          </li>
          <li>
            <a href="#">Shop</a>
          </li>
          <li>
            <a href="#">Service</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a href="#">About us</a>
          </li>
        </ul>
        <div className="policy">
          <a href="#">Shipping & returns</a>
          <a href="#">Terms & conditions</a>
          <a href="#">Privacy policy</a>
        </div>
        <div className="social-icons">
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaPinterest />
          </a>
          <a href="#">
            <FaFacebook />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaTelegram />
          </a>
        </div>
      </nav>
    </>
  );
};

export default MobileMenu;
