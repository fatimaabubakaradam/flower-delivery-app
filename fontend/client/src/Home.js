import React, { useState, useEffect } from "react";
import { FaPhone, FaMapMarkerAlt, FaLeaf, FaTruck, FaShieldAlt, FaStar } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";
import { PerformanceManager } from "./utils/PerformanceManager";
import Review from "./review";

import human from "./assets/human.png";
import Contact from "./assets/contact.png"
import "./App.css";

const Home = () => {
  const [images, setImages] = useState({
    heroImage: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=2000&auto=format&fit=crop",
    freshFlowers: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800&auto=format&fit=crop",
    driedFlowers: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=800&auto=format&fit=crop",
    livePlants: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=800&auto=format&fit=crop",
    aromaCandles: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
    fresheners: "https://images.unsplash.com/photo-1595910129840-21bd1399aadb?q=80&w=800&auto=format&fit=crop",
  });

  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'https://flower-delivery-app-backend.onrender.com';

  useEffect(() => {
    const imageMap = {
      heroImage: "67e32f83e29686944d247fe7",
      freshFlowers: "67e3341ee29686944d248000",
      driedFlowers: "67e3344fe29686944d248002",
      livePlants: "67e33d79e29686944d248038",
      aromaCandles: "67e33db7e29686944d24803a",
      fresheners: "67e33e00e29686944d24803c",
    };

    fetch(`${API_URL}/api/flowers`)
      .then(res => res.json())
      .then(data => {
        const updatedImages = {};
        const urlsToPreload = [];

        for (const [key, id] of Object.entries(imageMap)) {
          const flower = data.find(item => item._id === id);
          if (flower) {
            const url = `${API_URL}${flower.image}`;
            updatedImages[key] = url;
            if (key === 'heroImage' || key === 'freshFlowers') urlsToPreload.push(url);
          }
        }

        setImages(updatedImages);
        PerformanceManager.preloadImages(urlsToPreload);
      })
      .catch(err => console.error("Error fetching flower images:", err));
  }, [API_URL]);

  const handleLearnMoreClick = () => navigate("/about");

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Immersive Hero Section */}
      <section className="hero-wrap">
        <div className="hero-content">
          <span className="hero-badge">Kyiv LuxeBouquets®</span>
          <h1 className="title-display">
            Art of <br /><span className="text-gold">Gifting</span>
          </h1>
          <p>
            Experience the elegance of our uniquely crafted floral arrangements, curated from the finest seasonal blooms and delivered with absolute care in Kyiv.
          </p>
          <div className="action-row" style={{ maxWidth: '400px' }}>
            <Link to="/Category" className="btn-luxury">
              <span>Shop Collection</span>
            </Link>
            <button className="btn-luxury btn-outline" onClick={handleLearnMoreClick}>
              <span>Our Story</span>
            </button>
          </div>
        </div>
        
        <div className="hero-images">
          <div className="hero-img-box">
            <OptimizedImage src={images.heroImage} alt="Luxury Floral Arrangement" />
          </div>
          <div className="hero-img-box">
            <OptimizedImage src={images.freshFlowers} alt="Fresh Bloom Detail" />
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="categories-showcase section-padding container">
        <div className="section-header">
          <span className="subtitle">Collections</span>
          <h2>Curated For You</h2>
        </div>
        <div className="cat-grid">
          {/* Category Cards */}
          <Link to="/category/fresh-flowers" className="cat-card">
            <div className="cat-img-box">
              <img src={images.freshFlowers} alt="Fresh Flowers" />
            </div>
            <div className="cat-info">
              <h3 className="cat-title">Fresh Flowers</h3>
              <span className="cat-action">Shop Collection →</span>
            </div>
          </Link>

          <Link to="/category/dried-flowers" className="cat-card">
            <div className="cat-img-box">
              <img src={images.driedFlowers} alt="Dried Flowers" />
            </div>
            <div className="cat-info">
              <h3 className="cat-title">Dried Flowers</h3>
              <span className="cat-action">Shop Collection →</span>
            </div>
          </Link>

          <Link to="/category/live-plants" className="cat-card">
            <div className="cat-img-box">
              <img src={images.livePlants} alt="Live Plants" />
            </div>
            <div className="cat-info">
              <h3 className="cat-title">Live Plants</h3>
              <span className="cat-action">Shop Collection →</span>
            </div>
          </Link>

          <Link to="/category/aroma-candles" className="cat-card">
            <div className="cat-img-box">
              <img src={images.aromaCandles} alt="Aroma Candles" />
            </div>
            <div className="cat-info">
              <h3 className="cat-title">Aroma Candles</h3>
              <span className="cat-action">Shop Collection →</span>
            </div>
          </Link>
        </div>
      </section>

      {/* About Split Section */}
      <section className="split-section">
        <OptimizedImage src={human} alt="LuxeBouquets Florist" className="split-img" />
        <div className="split-content">
          <span className="hero-badge">Est. 2012</span>
          <h2>The Studio</h2>
          <p>
            We are a modern local floral studio specializing in the design and delivery of unique bouquets. Our master florists hand-pick each bloom from direct partnerships with leading farms around the world, ensuring unparalleled freshness and longevity.
          </p>
          <button className="btn-luxury" onClick={handleLearnMoreClick} style={{ alignSelf: 'flex-start' }}>
            <span>Meet the Artisans</span>
          </button>
        </div>
      </section>

      {/* Features / Why Choose Us */}
      <section className="section-padding container">
        <div className="section-header">
          <span className="subtitle">The Luxe Difference</span>
          <h2>Why Choose Us</h2>
        </div>
        <div className="features-grid">
          <div className="feature-box">
            <FaLeaf className="feature-icon" />
            <h3>Artisan Floristry</h3>
            <p>Each arrangement is a unique masterpiece crafted by award-winning designers.</p>
          </div>
          <div className="feature-box">
            <FaTruck className="feature-icon" />
            <h3>Punctual Delivery</h3>
            <p>Real-time tracking and precise delivery windows for every single order.</p>
          </div>
          <div className="feature-box">
            <FaShieldAlt className="feature-icon" />
            <h3>Safe & Secure</h3>
            <p>Industry-leading encryption ensures your personal data is protected.</p>
          </div>
          <div className="feature-box">
            <FaStar className="feature-icon" />
            <h3>Premium Quality</h3>
            <p>Only the freshest, hand-selected blooms make it into our signature boxes.</p>
          </div>
        </div>
      </section>

      {/* Subscription Callout */}
      <section className="split-section" style={{ background: 'var(--color-dark)' }}>
        <div className="split-content" style={{ background: 'transparent', color: '#fff' }}>
          <span className="hero-badge" style={{ color: 'var(--color-accent-gold-light)', borderColor: 'var(--color-accent-gold-light)' }}>
            Elevate Your Space
          </span>
          <h2 style={{ color: '#fff' }}>Floral Subscriptions</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)' }}>
            Transform your home or office weekly with our curated floral designs. Enjoy flexible plans that bring nature's fleeting beauty to your door automatically.
          </p>
          <button className="btn-luxury" style={{ alignSelf: 'flex-start', background: 'var(--color-accent-gold)', borderColor: 'var(--color-accent-gold)' }}>
            <span>Subscribe Now</span>
          </button>
        </div>
        <OptimizedImage src={images.livePlants} alt="Subscriptions" className="split-img" />
      </section>

      {/* Contact Overlay Section */}
      <section className="contact-overlay">
        <div className="container">
          <span className="hero-badge">Concierge Service</span>
          <h2>Book a Consultation</h2>
          <p style={{ marginBottom: '40px', color: 'rgba(255,255,255,0.8)' }}>
            Planning an event or need a bespoke arrangement? Leave your details below and our lead designer will contact you.
          </p>
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <input type="text" className="luxury-input" placeholder="Your Name" />
            <input type="text" className="luxury-input" placeholder="+380 XX XXX XX XX" />
            <button className="btn-luxury" style={{ width: '100%' }}>
              <span>Request Call</span>
            </button>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginTop: '60px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaPhone className="text-gold" />
              <span>+380 98 009 9777</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaMapMarkerAlt className="text-gold" />
              <span>15/4 Khreshchatyk, Kyiv</span>
            </div>
          </div>
        </div>
      </section>

      <div style={{ padding: '80px 0', background: 'var(--color-bg-secondary)' }}>
        <Review />
      </div>
    </div>
  );
};

export default Home;
