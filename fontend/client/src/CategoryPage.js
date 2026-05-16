import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";
import Skeleton from "./components/Skeleton";
import Review from "./review";
import Fresh from "./assets/fresh.png";
import Dry from "./assets/dry.png";
import Live from "./assets/live.png";
import Aroma from "./assets/aroma.png";
import "./App.css";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Map slug to display name and hero image
  const categoryMeta = {
    "fresh-flowers": { 
      title: "Fresh Flowers", 
      image: Fresh,
      fallback: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1200",
      desc: "Experience the vibrant beauty and intoxicating scents of our seasonal fresh blooms."
    },
    "dried-flowers": { 
      title: "Dried Flowers", 
      image: Dry,
      fallback: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=1200",
      desc: "Timeless elegance that lasts forever. Our dried arrangements add a touch of rustic luxury."
    },
    "live-plants": { 
      title: "Live Plants", 
      image: Live,
      fallback: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200",
      desc: "Breathe life into your space with our curated selection of resilient and stunning live plants."
    },
    "aroma-candles": { 
      title: "Aroma Candles", 
      image: Aroma,
      fallback: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200",
      desc: "Set the mood with our exquisite collection of hand-poured luxury scented candles."
    }
  };

  const currentMeta = categoryMeta[categoryName] || { 
    title: "Our Collection", 
    image: Fresh, 
    fallback: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200",
    desc: "Explore our masterfully curated selection of boutique floral arrangements and lifestyle gifts."
  };

  useEffect(() => {
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
    
    // Format category for backend (e.g. 'fresh-flowers' -> 'Fresh Flowers')
    const backendCategory = categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

    fetch(`${apiUrl}/api/flowers?category=${encodeURIComponent(backendCategory)}`)
      .then((res) => res.json())
      .then((data) => {
        setFlowers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching flowers:", error);
        setLoading(false);
      });
  }, [categoryName]);

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Dynamic Category Hero */}
      <section className="shop-header" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.6), rgba(255,255,255,0.8)), url(${currentMeta.image || currentMeta.fallback})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <span className="subtitle">Collection</span>
        <h1 className="title-display">{currentMeta.title}</h1>
        <p style={{ color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
          {currentMeta.desc}
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
                  src={flower.image.startsWith('http') ? flower.image : `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}${flower.image}`}
                  alt={flower.name}
                  aspectRatio="4/5"
                  className="prod-img"
                />
                <span className="prod-badge">{currentMeta.title.split(' ')[0]}</span>
                <div className="prod-action">Quick View</div>
              </div>
              <div className="prod-info">
                <h3 className="prod-title">{flower.name}</h3>
                <p className="prod-price">${flower.price}</p>
              </div>
            </Link>
          ))
        ) : (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0' }}>
            <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', fontFamily: 'var(--font-serif)' }}>
              We are currently preparing new masterpieces for this collection.
            </p>
            <Link to="/" className="btn-luxury" style={{ marginTop: '30px', display: 'inline-block' }}>
              <span>Return to Home</span>
            </Link>
          </div>
        )}
      </section>

      <div style={{ padding: '80px 0', background: 'var(--color-bg-secondary)' }}>
        <Review />
      </div>
    </div>
  );
};

export default CategoryPage;
