import React, { useState, useEffect } from "react";
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsOpen(false);
    window.location.href = "/"; // Optional: redirect after sign out
  };

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
          {!isLoggedIn ? (
            <li>
              <Link to="/signin" onClick={() => setIsOpen(false)}>
                Sign in
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/signup" onClick={() => setIsOpen(false)}>
                  Sign up
                </Link>
              </li>
              <li>
                <button onClick={handleSignOut} className="signout-btn">
                  Sign out
                </button>
              </li>
            </>
          )}

          <li>
            <Link to="/product" onClick={() => setIsOpen(false)}>
              Shop
            </Link>
          </li>

          <li>
            <a href="#">Service</a>
          </li>

          <li>
            <Link to="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>

          <li>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              About us
            </Link>
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
