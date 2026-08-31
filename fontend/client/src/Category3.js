import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";
import Skeleton from "./components/Skeleton";
import Review from "./review";
import Aroma from "./assets/aroma.png";
import "./App.css";

const Category3 = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://flower-delivery-app-backend.onrender.com';

    fetch(`${apiUrl}/api/flowers`)
      .then((res) => res.json())
      .then((data) => {
        const flowerIds = [
          "67fd5aa9c037fa1d857d95ba", "67fd5e3fc037fa1d857d95cc", "67fd5b2bc037fa1d857d95be",
          "67fd5b72c037fa1d857d95c0", "67fd5b9fc037fa1d857d95c2", "67fd5c8fc037fa1d857d95c4",
          "67fd5eabc037fa1d857d95d0", "67fd5ed0c037fa1d857d95d3", "67fd5effc037fa1d857d95d6",
          "67fd5fb6c037fa1d857d95dc"
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
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.9)), url(${Aroma})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <span className="subtitle">Collection</span>
        <h1 className="title-display">Aroma Candles</h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Ignite the senses with our exquisite collection of hand-poured aroma candles, crafted to set the perfect ambiance.
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
                <span className="prod-badge">Scented</span>
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

export default Category3;
