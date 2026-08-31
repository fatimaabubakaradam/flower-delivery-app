import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./App.css";

const DesktopMenu = ({ onCartClick }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <div className="desktop-menu-container">
      <Link to="/product" className="menu-item">Shop</Link>

      <Link to="/contact" className="menu-item">Contact</Link>

      <div className="menu-item"></div>

      {!isLoggedIn ? (
        <Link to="/signin" className="menu-item">Sign in</Link>
      ) : (
        <div className="menu-item" onClick={handleSignOut} style={{ cursor: "pointer" }}>
          Sign out
        </div>
      )}

      <div
        className="menu-item"
        onClick={onCartClick}
        style={{ cursor: "pointer" }}
      >
        Cart
      </div>
    </div>
  );
};

export default DesktopMenu;
