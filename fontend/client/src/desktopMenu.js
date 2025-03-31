import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const DesktopMenu = ({ onCartClick }) => {
  return (
    <div className="desktop-menu-container">
      <div className="menu-item">Shop</div>
      <div className="menu-item">Contact</div>
      <div className="menu-item"></div>
      <Link to="/signin" className="menu-item">Sign in</Link>
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
