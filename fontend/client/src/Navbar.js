import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";
import Cart from "./cart";
import AuthContext from "./AuthContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false); // close mobile menu on route change
  }, [location]);

  const handleSignOut = () => {
    logout();
    setMobileOpen(false);
    window.location.href = "/";
  };

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        {/* Mobile Menu Toggle */}
        <button className="action-icon" style={{ display: 'none' }} id="mobile-toggle" onClick={() => setMobileOpen(true)}>
          <FaBars />
        </button>

        {/* Brand */}
        <Link to="/" className="nav-brand">
          Luxe<span>Bouquets</span>
        </Link>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><Link to="/category/fresh-flowers" className={`nav-link ${location.pathname.includes('/category') ? 'active' : ''}`}>Shop</Link></li>
          <li><Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>Our Story</Link></li>
          <li><Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link></li>
          {!user ? (
            <li><Link to="/signin" className={`nav-link ${location.pathname === '/signin' ? 'active' : ''}`}>Sign In</Link></li>
          ) : (
            <li className="user-nav">
              <span className="user-name">Hello, {user.name || 'Artisan'}</span>
              <span className="nav-link" onClick={handleSignOut} style={{ cursor: 'pointer', marginLeft: '15px' }}>Sign Out</span>
            </li>
          )}
        </ul>

        {/* Actions */}
        <div className="nav-actions">
          <button className="action-icon" onClick={() => setCartOpen(true)}>
            <FaShoppingBag />
            <span className="cart-badge">0</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div className={`mobile-menu ${mobileOpen ? "show" : ""}`} style={{ 
        position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', 
        background: 'var(--color-surface)', zIndex: 3000, 
        transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'var(--trans-smooth)', padding: '100px 10%',
        display: 'flex', flexDirection: 'column'
      }}>
        <button className="close-icon" onClick={() => setMobileOpen(false)} style={{
          position: 'absolute', top: '30px', left: '5%', background: 'none', border: 'none',
          fontSize: '2rem', color: 'var(--color-dark)', cursor: 'pointer'
        }}>
          <FaTimes />
        </button>
        
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '30px', margin: 'auto 0' }}>
          <li><Link to="/" onClick={() => setMobileOpen(false)} style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-dark)', textDecoration: 'none' }}>Home</Link></li>
          <li><Link to="/category/fresh-flowers" onClick={() => setMobileOpen(false)} style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-dark)', textDecoration: 'none' }}>Shop</Link></li>
          <li><Link to="/about" onClick={() => setMobileOpen(false)} style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-dark)', textDecoration: 'none' }}>Our Story</Link></li>
          <li><Link to="/contact" onClick={() => setMobileOpen(false)} style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-dark)', textDecoration: 'none' }}>Contact</Link></li>
          
          {!user ? (
            <li><Link to="/signin" onClick={() => setMobileOpen(false)} style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-accent-gold)', textDecoration: 'none' }}>Sign In</Link></li>
          ) : (
            <li><span onClick={handleSignOut} style={{ fontSize: '2.5rem', fontFamily: 'var(--font-serif)', color: 'var(--color-accent-gold)', textDecoration: 'none', cursor: 'pointer' }}>Sign Out</span></li>
          )}
        </ul>
      </div>

      {/* Cart Drawer */}
      {cartOpen && <Cart onClose={() => setCartOpen(false)} />}
      
      <style>{`
        @media (max-width: 768px) {
          #mobile-toggle { display: block !important; }
          .nav-links { display: none !important; }
        }
        .user-nav {
          display: flex;
          align-items: center;
          color: var(--color-text-muted);
          font-size: 0.8rem;
          font-family: var(--font-sans);
          letter-spacing: 0.05em;
        }
        .user-name {
          border-right: 1px solid rgba(0,0,0,0.1);
          padding-right: 15px;
        }
      `}</style>
    </>
  );
};

export default Navbar;
