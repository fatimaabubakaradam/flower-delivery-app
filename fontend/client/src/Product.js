import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";
import Review from "./review";
import { formatDollar } from "./utils/currency";
import "./App.css";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/api/flowers/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFlower({
            ...data,
            imageUrl: data.image.startsWith('http') ? data.image : `${API_URL}${data.image}`,
          });
        })
        .catch((error) => console.error("Error fetching flower:", error));
    }
  }, [id, API_URL]);

  const handleAddToCartAndCheckout = useCallback(() => {
    if (!flower) return;
    
    const itemToAdd = {
      _id: flower._id,
      id: flower._id,
      name: flower.name,
      price: flower.price,
      image: flower.image,
      imageUrl: flower.imageUrl,
      quantity: quantity,
    };

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = [...existingCart, itemToAdd];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
    
    navigate("/checkout");
  }, [flower, quantity, navigate]);

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', paddingTop: '100px' }}>
      {flower ? (
        <div className="product-detail-wrap container" style={{ padding: '60px 0' }}>
          <section className="product-gallery">
            <OptimizedImage
              src={flower.imageUrl}
              alt={flower.name}
            />
          </section>

          <section className="product-info-panel">
            <span className="hero-badge">{flower.category || 'Signature Collection'}</span>
            <h1 className="title-display" style={{ textTransform: 'none', margin: '15px 0' }}>{flower.name}</h1>
            <p className="prod-price-dollar" style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-accent-gold-dark)', marginBottom: '24px' }}>
              {formatDollar(flower.price)}
            </p>
            
            <p className="product-desc" style={{ fontSize: '1rem', color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '30px' }}>
              {flower.description || 'An exquisite arrangement of seasonal blooms, hand-selected for their beauty and freshness. Perfect for making any occasion unforgettable. Expertly arranged by our master florists.'}
            </p>

            <div style={{ marginBottom: '12px' }}>
              <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Quantity
              </span>
            </div>
            
            <div className="qty-selector" style={{ marginBottom: '35px' }}>
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
                style={{ width: '100%', padding: '18px 30px' }}
                onClick={handleAddToCartAndCheckout}
              >
                <span>Select Flower & Checkout</span>
              </button>
            </div>

            <div style={{ marginTop: '50px', paddingTop: '30px', borderTop: 'var(--border-delicate)' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>
                <div>
                  <strong style={{ color: 'var(--color-dark)', display: 'block', marginBottom: '4px' }}>Boutique Delivery</strong>
                  Hand-delivered in temperature-controlled aesthetic packaging.
                </div>
                <div>
                  <strong style={{ color: 'var(--color-dark)', display: 'block', marginBottom: '4px' }}>Care Instruction</strong>
                  Keep in cool shade and refresh stem ends daily.
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : (
        <div style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
