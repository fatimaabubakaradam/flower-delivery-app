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
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Category Hero */}
      <section className="shop-header" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.9)), url(${Fresh})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <span className="subtitle">Collection</span>
        <h1 className="title-display">Fresh Blooms</h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Discover our signature collection of freshly cut flowers, elegantly arranged to brighten any space and elevate every occasion.
        </p>
      </section>

      <section className="product-grid">
        {loading ? (
          Array(8).fill(0).map((_, i) => (
            <div key={i} style={{ border: 'none' }}>
              <Skeleton aspectRatio="4/5" />
              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <Skeleton width="60%" height="24px" style={{ margin: '0 auto 10px' }} />
                <Skeleton width="30%" height="20px" style={{ margin: '0 auto' }} />
              </div>
            </div>
          ))
        ) : flowers.length > 0 ? (
          flowers.map((flower) => (
            <Link
              to={`/product/${flower._id}`}
              key={flower._id}
              className="prod-card"
            >
              <div className="prod-img-wrap">
                <OptimizedImage
                  src={`${process.env.REACT_APP_API_URL || 'https://flower-delivery-app-backend.onrender.com'}${flower.image}`}
                  alt={flower.name}
                  aspectRatio="4/5"
                  className="prod-img"
                />
                <span className="prod-badge">Fresh</span>
                <div className="prod-action">Quick View</div>
              </div>
              <div className="prod-info">
                <h3 className="prod-title">{flower.name}</h3>
                <p className="prod-price">${flower.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)' }}>No masterpieces found in this collection.</p>
          </div>
        )}
      </section>

      <div style={{ padding: '80px 0', background: 'var(--color-bg-secondary)' }}>
        <Review />
      </div>
    </div>
  );
};

export default Category;
