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
    <div className="product-container fade-in" style={{ padding: '80px 40px' }}>
      {flower ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          <section className="product-image-container">
            <OptimizedImage
              src={flower.imageUrl}
              alt={flower.name}
              aspectRatio="4/5"
              className="product-image"
            />
          </section>

          <section className="product-details" style={{ padding: '20px 0' }}>
            <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--gold)', marginBottom: '16px' }}>
              {flower.category || 'Premium Collection'}
            </p>
            <h1 style={{ fontSize: '3rem', marginBottom: '12px' }}>{flower.name}</h1>
            <p style={{ fontSize: '2rem', fontWeight: 500, marginBottom: '32px', color: 'var(--text-primary)' }}>${flower.price}</p>
            
            <div style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>Description</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8 }}>{flower.description}</p>
            </div>

            <div className="quantity-section" style={{ marginBottom: '40px' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', marginBottom: '12px' }}>Quantity</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid var(--medium-gray)', width: 'fit-content', padding: '8px' }}>
                <button
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', width: '40px', cursor: 'pointer' }}
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  style={{ width: '40px', textAlign: 'center', border: 'none', fontSize: '1rem', fontWeight: 600 }}
                />
                <button 
                  style={{ background: 'none', border: 'none', fontSize: '1.5rem', width: '40px', cursor: 'pointer' }}
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>

            <button
              className="add-to-basket"
              style={{ padding: '24px', fontSize: '1rem' }}
              onClick={handleAddToCart}
              disabled={!isAuthenticated}
            >
              ADD TO BASKET
            </button>
            {!isAuthenticated && (
              <p style={{ marginTop: '16px', fontSize: '0.875rem', color: 'var(--accent-red)', textAlign: 'center' }}>
                Please sign in to place an order.
              </p>
            )}
          </section>
        </div>
      ) : (
        <div style={{ height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Curating your selection...</p>
        </div>
      )}

      <div style={{ marginTop: '100px' }}>
        <Review />
      </div>
    </div>
  );
};

export default Product;
