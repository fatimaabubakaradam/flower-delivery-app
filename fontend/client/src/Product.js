import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";
import AuthContext from "./AuthContext";
import Review from "./review";
import "./App.css";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, openLoginModal } = useContext(AuthContext);
  const [flower, setFlower] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";

    if (id) {
      fetch(`${apiUrl}/api/flowers/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFlower({
            ...data,
            imageUrl: data.image.startsWith('http') ? data.image : `${apiUrl}${data.image}`,
          });
        })
        .catch((error) => console.error("Error fetching flower:", error));
    }
  }, [id]);

  const performAddToCart = useCallback((flowerData, qty) => {
    if (!flowerData) return;
    
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCart = [...existingCart, { ...flowerData, quantity: qty }];
    localStorage.setItem("cartItems", JSON.stringify(newCart));
    window.dispatchEvent(new Event("cart-updated"));
    
    // Immediate redirection to checkout as requested for optimized conversion
    navigate("/checkout");
  }, [navigate]);

  const handleAddToCart = () => {
    if (!user) {
      // Capture the action to be performed after login
      openLoginModal(() => performAddToCart(flower, quantity));
      return;
    }

    performAddToCart(flower, quantity);
  };

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {flower ? (
        <div className="product-detail-wrap">
          <section className="product-gallery">
            <OptimizedImage
              src={flower.imageUrl}
              alt={flower.name}
            />
          </section>

          <section className="product-info-panel">
            <span className="hero-badge">{flower.category || 'Signature Collection'}</span>
            <h1 className="title-display" style={{ textTransform: 'none' }}>{flower.name}</h1>
            <p className="price">${flower.price}</p>
            
            <p className="product-desc">
              {flower.description || 'An exquisite arrangement of seasonal blooms, hand-selected for their beauty and freshness. Perfect for making any occasion unforgettable. Expertly arranged by our master florists.'}
            </p>

            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
                Quantity
              </span>
            </div>
            
            <div className="qty-selector">
              <button
                className="qty-btn"
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                −
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="qty-input"
              />
              <button 
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>

            <div className="action-row" style={{ marginTop: '20px' }}>
              <button
                className="btn-luxury"
                onClick={handleAddToCart}
              >
                <span>Add To Cart & Checkout</span>
              </button>
            </div>
            
            {!user && (
              <p style={{ marginTop: '20px', color: 'var(--color-accent-gold-dark)', fontSize: '0.9rem' }}>
                Sign in to proceed to instant checkout.
              </p>
            )}

            <div style={{ marginTop: '60px', paddingTop: '40px', borderTop: 'var(--border-delicate)' }}>
              <div style={{ display: 'flex', gap: '40px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                <div>
                  <strong style={{ color: 'var(--color-dark)', display: 'block', marginBottom: '5px' }}>Delivery</strong>
                  Next day delivery available in Kyiv.
                </div>
                <div>
                  <strong style={{ color: 'var(--color-dark)', display: 'block', marginBottom: '5px' }}>Care</strong>
                  Trim stems and change water daily.
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ width: '40px', height: '40px', border: '2px solid var(--color-accent-gold)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 20px' }}></div>
            <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.75rem' }}>Preparing your selection...</p>
          </div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}

      <div style={{ padding: '80px 0', background: 'var(--color-bg-secondary)' }}>
        <Review />
      </div>
    </div>
  );
};

export default Product;
