import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";
import Review from "./review";
import "./App.css";

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    const apiUrl = process.env.REACT_APP_API_URL || "https://flower-delivery-app-backend.onrender.com";

    fetch(`${apiUrl}/api/flowers/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFlower({
          ...data,
          imageUrl: `${apiUrl}${data.image}`,
        });
      })
      .catch((error) => console.error("Error fetching flower:", error));
  }, [id]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert("Please sign in to add items to the cart.");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const newCart = [...existingCart, { ...flower, quantity }];
    localStorage.setItem("cartItems", JSON.stringify(newCart));

    alert("Item added to cart!");
    navigate("/cart");
  };

  return (
    <div className="product-container fade-in">
      {flower ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'start' }}>
          <section className="product-visual">
            <OptimizedImage
              src={flower.imageUrl}
              alt={flower.name}
              aspectRatio="4/5"
              className="product-image"
            />
          </section>

          <section className="product-info">
            <span className="about-label">{flower.category || 'Kyiv Luxe Collection'}</span>
            <h1 className="product-title">{flower.name}</h1>
            <p className="product-price">${flower.price}</p>
            
            <div style={{ marginBottom: '60px' }}>
              <p className="footer-label" style={{ marginBottom: '16px' }}>Description</p>
              <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                {flower.description || 'An exquisite arrangement of seasonal blooms, hand-selected for their beauty and freshness. Perfect for making any occasion unforgettable.'}
              </p>
            </div>

            <div className="quantity-section">
              <p className="footer-label" style={{ marginBottom: '16px' }}>Quantity</p>
              <div className="quantity-box">
                <button
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  style={{ width: '40px', textAlign: 'center', border: 'none', background: 'none', fontSize: '1.25rem', fontWeight: 600, fontFamily: 'inherit' }}
                />
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="btn-luxe"
              style={{ width: '100%', padding: '24px' }}
              onClick={handleAddToCart}
              disabled={!isAuthenticated}
            >
              ADD TO BASKET
            </button>
            {!isAuthenticated && (
              <p style={{ marginTop: '20px', color: 'var(--color-gold-dark)', textAlign: 'center', fontWeight: 500 }}>
                Please sign in to place an order.
              </p>
            )}
          </section>
        </div>
      ) : (
        <div style={{ height: '600px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <div className="skeleton" style={{ width: '60px', height: '60px', borderRadius: '50%', marginBottom: '20px' }}></div>
          <p style={{ letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 800 }}>Preparing your selection...</p>
        </div>
      )}

      <div style={{ marginTop: '140px' }}>
        <Review />
      </div>
    </div>
  );
};

export default Product;
