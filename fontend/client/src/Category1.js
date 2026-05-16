import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";
import Skeleton from "./components/Skeleton";
import Review from "./review";
import Dry from "./assets/dried.png";
import "./App.css";

const Category1 = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'https://flower-delivery-app-backend.onrender.com';

    fetch(`${apiUrl}/api/flowers`)
      .then((res) => res.json())
      .then((data) => {
        const flowerIds = [
          "67fb1a7347d80a58e98c8525", "67fb1bce47d80a58e98c8535", "67fb21ad47d80a58e98c854d",
          "67fb21eb47d80a58e98c8550", "67fb1ee447d80a58e98c853f", "67fb223947d80a58e98c8553",
          "67fade1847d80a58e98c8501", "67fafc5947d80a58e98c850b", "67fb1f5947d80a58e98c8542",
          "67fb1e9647d80a58e98c853c"
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
        backgroundImage: `linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.9)), url(${Dry})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <span className="subtitle">Collection</span>
        <h1 className="title-display">Dried Flowers</h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Embrace timeless beauty with our artisanal collection of preserved and dried botanicals, offering elegance that lasts.
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
                <span className="prod-badge">Dried</span>
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

export default Category1;
