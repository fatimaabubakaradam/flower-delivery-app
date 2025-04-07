import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

const DesktopMenu = ({ onCartClick }) => {
  return (
    <div className="desktop-menu-container">
<Link to="/product" className="menu-item">Shop</Link>

<Link to="/contact" className="menu-item">Contact</Link>

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
