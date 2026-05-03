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
      <section style={{ height: '400px', position: 'relative', overflow: 'hidden' }}>
        <img 
          src={Fresh} 
          alt="Fresh Collection" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '4rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Fresh Collection</h1>
        </div>
      </section>

      <div className="cat-con-flower">
        <section className="flowers-list">
          {loading ? (
            // Skeleton Grid
            Array(8).fill(0).map((_, i) => (
              <div key={i} className="flower-card">
                <Skeleton aspectRatio="3/4" />
                <div style={{ marginTop: '16px' }}>
                  <Skeleton width="60%" height="24px" />
                  <Skeleton width="40%" height="20px" style={{ marginTop: '8px' }} />
                </div>
              </div>
            ))
          ) : flowers.length > 0 ? (
            flowers.map((flower) => (
              <Link
                to={`/product/${flower._id}`}
                key={flower._id}
                className="flower-card"
              >
                <OptimizedImage
                  src={`${process.env.REACT_APP_API_URL || 'https://flower-delivery-app-backend.onrender.com'}${flower.image}`}
                  alt={flower.name}
                  aspectRatio="3/4"
                />
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600 }}>{flower.name}</h3>
                  <span style={{ fontWeight: 700, color: 'var(--gold)' }}>${flower.price}</span>
                </div>
              </Link>
            ))
          ) : (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
              <p>No masterpieces found in this collection.</p>
            </div>
          )}
        </section>
      </div>

      <div style={{ padding: '0 40px' }}>
        <Review />
      </div>
    </div>
  );
};

export default Category;
