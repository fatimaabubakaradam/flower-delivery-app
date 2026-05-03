import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";
import Skeleton from "./components/Skeleton";
import Review from "./review";
import Fresh from "./assets/fresh.png";
import "./App.css";

const Category = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://flower-delivery-app-backend.onrender.com';

    fetch(`${apiUrl}/api/flowers`)
      .then((res) => res.json())
      .then((data) => {
        const flowerIds = [
          "67faceae47d80a58e98c842b", "67facfb147d80a58e98c842d", "67fad03f47d80a58e98c842f",
          "67fad0a247d80a58e98c8431", "67fad16347d80a58e98c8435", "67fad1f647d80a58e98c8437",
          "67fad27e47d80a58e98c8439", "67fad2d947d80a58e98c843b", "67fad33b47d80a58e98c843d",
          "67fad38f47d80a58e98c843f",
        ];
        const freshFlowers = data.filter((flower) =>
          flowerIds.includes(flower._id)
        );
        setFlowers(freshFlowers);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching flowers:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="fade-in">
      {/* Category Hero */}
      <section style={{ height: '60vh', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={Fresh} 
          alt="Fresh Collection" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.5))', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <span className="about-label" style={{ color: 'white', marginBottom: '16px' }}>Collection</span>
          <h1 style={{ color: 'white', fontSize: '5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Fresh Flowers</h1>
        </div>
      </section>

      <div className="home-container">
        <section style={{ padding: '100px 0' }} className="flowers-list">
          {loading ? (
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="flower-card" style={{ border: 'none' }}>
                <Skeleton aspectRatio="3/4" />
                <div style={{ marginTop: '24px' }}>
                  <Skeleton width="70%" height="28px" />
                  <Skeleton width="30%" height="20px" style={{ marginTop: '12px' }} />
                </div>
              </div>
            ))
          ) : flowers.length > 0 ? (
            flowers.map((flower) => (
              <Link
                to={`/product/${flower._id}`}
                key={flower._id}
                className="flower-card"
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{ overflow: 'hidden', marginBottom: '24px' }}>
                  <OptimizedImage
                    src={`${process.env.REACT_APP_API_URL || 'https://flower-delivery-app-backend.onrender.com'}${flower.image}`}
                    alt={flower.name}
                    aspectRatio="3/4"
                    containerClassName="category-item-img"
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{flower.name}</h3>
                  <p style={{ fontWeight: 600, color: 'var(--color-gold-dark)', fontSize: '1.125rem' }}>${flower.price}</p>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '120px 0' }}>
              <p style={{ fontSize: '1.5rem', opacity: 0.6 }}>No masterpieces found in this collection.</p>
            </div>
          )}
        </section>
      </div>

      <Review />
    </div>
  );
};

export default Category;
