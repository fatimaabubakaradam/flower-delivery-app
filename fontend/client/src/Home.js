import React, { useState, useEffect, useRef } from "react";
import { FaLeaf, FaTruck, FaShieldAlt, FaStar, FaArrowRight } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";
import Review from "./review";
import { formatDollar } from "./utils/currency";

import human from "./assets/human.png";
import "./App.css";

const CATEGORIES = [
  {
    id: "fresh-flowers",
    title: "Fresh Flowers",
    subtitle: "Vibrant Seasonal Blooms",
    description: "Hand-picked fresh floral arrangements curated daily from premier ethical farms.",
    colClass: "col-7",
    defaultImg: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "dried-flowers",
    title: "Dried Flowers",
    subtitle: "Timeless Botanicals",
    description: "Everlasting floral arrangements crafted to preserve nature's subtle elegance.",
    colClass: "col-5",
    defaultImg: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "live-plants",
    title: "Live Plants",
    subtitle: "Botanical Living",
    description: "Curated potted greenery designed to bring calm and vitality into modern spaces.",
    colClass: "col-5",
    defaultImg: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "aroma-candles",
    title: "Aroma Candles",
    subtitle: "Sensory Indulgence",
    description: "Hand-poured luxury soy candles with bespoke fragrance profiles.",
    colClass: "col-7",
    defaultImg: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop",
  },
];

const FALLBACK_FLOWERS = {
  "fresh-flowers": [
    { _id: "ff1", name: "Royal Crimson Roses", price: 65, category: "Fresh Flowers", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800" },
    { _id: "ff2", name: "Blush Peony Bloom", price: 75, category: "Fresh Flowers", image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800" },
    { _id: "ff3", name: "White Lily Elegance", price: 55, category: "Fresh Flowers", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800" },
    { _id: "ff4", name: "Sunburst Tulip Array", price: 45, category: "Fresh Flowers", image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800" },
    { _id: "ff5", name: "Velvet Rose & Hydrangea", price: 95, category: "Fresh Flowers", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800" },
    { _id: "ff6", name: "Pastel Meadow Bouquet", price: 80, category: "Fresh Flowers", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=800" },
    { _id: "ff7", name: "Orchid Cascade", price: 110, category: "Fresh Flowers", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800" },
    { _id: "ff8", name: "Eucalyptus Rose Garden", price: 85, category: "Fresh Flowers", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=800" },
    { _id: "ff9", name: "Golden Sunset Dahlias", price: 60, category: "Fresh Flowers", image: "https://images.unsplash.com/photo-1595910129840-21bd1399aadb?q=80&w=800" },
    { _id: "ff10", name: "Kyiv Signature Deluxe", price: 125, category: "Fresh Flowers", image: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?q=80&w=800" },
  ],
  "dried-flowers": [
    { _id: "df1", name: "Terracotta Dried Palm", price: 50, category: "Dried Flowers", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=800" },
    { _id: "df2", name: "Rustic Pampas Grass", price: 40, category: "Dried Flowers", image: "https://images.unsplash.com/photo-1595910129840-21bd1399aadb?q=80&w=800" },
    { _id: "df3", name: "Golden Wheat Stems", price: 35, category: "Dried Flowers", image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800" },
    { _id: "df4", name: "Lavender Sunset Preserved", price: 55, category: "Dried Flowers", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800" },
    { _id: "df5", name: "Bleached Bunny Tails", price: 30, category: "Dried Flowers", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800" },
    { _id: "df6", name: "Earthy Eucalyptus Bundle", price: 45, category: "Dried Flowers", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=800" },
    { _id: "df7", name: "Preserved Rose Box", price: 85, category: "Dried Flowers", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800" },
    { _id: "df8", name: "Autumn Oats & Gypsophila", price: 48, category: "Dried Flowers", image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800" },
    { _id: "df9", name: "Vintage Hydrangea Dried", price: 65, category: "Dried Flowers", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800" },
    { _id: "df10", name: "Boho Wildflower Arrangement", price: 70, category: "Dried Flowers", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800" },
  ],
  "live-plants": [
    { _id: "lp1", name: "Monstera Deliciosa", price: 55, category: "Live Plants", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=800" },
    { _id: "lp2", name: "Fiddle Leaf Fig", price: 75, category: "Live Plants", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800" },
    { _id: "lp3", name: "Snake Plant Laurentii", price: 40, category: "Live Plants", image: "https://images.unsplash.com/photo-1595910129840-21bd1399aadb?q=80&w=800" },
    { _id: "lp4", name: "Peace Lily Bloom", price: 45, category: "Live Plants", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800" },
    { _id: "lp5", name: "Golden Pothos Totem", price: 35, category: "Live Plants", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=800" },
    { _id: "lp6", name: "ZZ Plant Obsidian", price: 50, category: "Live Plants", image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800" },
    { _id: "lp7", name: "Bonsai Ficus Microcarpa", price: 90, category: "Live Plants", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800" },
    { _id: "lp8", name: "Calathea Orbifolia", price: 48, category: "Live Plants", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800" },
    { _id: "lp9", name: "Aloe Vera Ceramic Pot", price: 28, category: "Live Plants", image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800" },
    { _id: "lp10", name: "Majesty Palm Tree", price: 115, category: "Live Plants", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800" },
  ],
  "aroma-candles": [
    { _id: "ac1", name: "Amber & Sandalwood Candle", price: 38, category: "Aroma Candles", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800" },
    { _id: "ac2", name: "Velvet Rose & Oud Candle", price: 45, category: "Aroma Candles", image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=800" },
    { _id: "ac3", name: "French Lavender Soy Candle", price: 32, category: "Aroma Candles", image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=800" },
    { _id: "ac4", name: "Vanilla Bean & Oak", price: 35, category: "Aroma Candles", image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=800" },
    { _id: "ac5", name: "Midnight Fig & Cassis", price: 42, category: "Aroma Candles", image: "https://images.unsplash.com/photo-1595910129840-21bd1399aadb?q=80&w=800" },
    { _id: "ac6", name: "Bergamot & Tobacco Leaf", price: 40, category: "Aroma Candles", image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=800" },
    { _id: "ac7", name: "Cedarwood & Pine Forest", price: 36, category: "Aroma Candles", image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800" },
    { _id: "ac8", name: "Wild Jasmine & Honey", price: 44, category: "Aroma Candles", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800" },
    { _id: "ac9", name: "Spiced Cinnamon & Orange", price: 30, category: "Aroma Candles", image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?q=80&w=800" },
    { _id: "ac10", name: "Luxe Botanical Trio Set", price: 88, category: "Aroma Candles", image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=800" },
  ]
};

const Home = () => {
  const [images, setImages] = useState({
    heroImage: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?q=80&w=2000&auto=format&fit=crop",
    "fresh-flowers": "https://images.unsplash.com/photo-1561181286-d3fee7d55364?q=80&w=1200&auto=format&fit=crop",
    "dried-flowers": "https://images.unsplash.com/photo-1508610048659-a06b669e3321?q=80&w=1200&auto=format&fit=crop",
    "live-plants": "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=1200&auto=format&fit=crop",
    "aroma-candles": "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=1200&auto=format&fit=crop",
  });

  const [activeCategory, setActiveCategory] = useState("fresh-flowers");
  const [filteredFlowers, setFilteredFlowers] = useState(FALLBACK_FLOWERS["fresh-flowers"]);
  const [loadingFlowers, setLoadingFlowers] = useState(false);

  const collectionRef = useRef(null);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${API_URL}/api/flowers`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const updatedImages = { ...images };
          const heroFlower = data.find(f => f._id === "67e32f83e29686944d247fe7");
          if (heroFlower) updatedImages.heroImage = `${API_URL}${heroFlower.image}`;
          setImages(updatedImages);
        }
      })
      .catch((err) => console.error("Error fetching hero flowers:", err));
  }, [API_URL]);

  useEffect(() => {
    setLoadingFlowers(true);
    let url = `${API_URL}/api/flowers`;
    if (activeCategory) {
      const formattedCategory = activeCategory
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      url = `${API_URL}/api/flowers?category=${encodeURIComponent(formattedCategory)}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length >= 10) {
          setFilteredFlowers(data);
        } else if (Array.isArray(data) && data.length > 0) {
          // If fewer than 10, merge with fallback items so at least 10 are ALWAYS shown
          const fallback = FALLBACK_FLOWERS[activeCategory] || [];
          const merged = [...data];
          fallback.forEach(item => {
            if (merged.length < 10) merged.push(item);
          });
          setFilteredFlowers(merged);
        } else {
          setFilteredFlowers(FALLBACK_FLOWERS[activeCategory] || FALLBACK_FLOWERS["fresh-flowers"]);
        }
        setLoadingFlowers(false);
      })
      .catch((err) => {
        console.warn("Using fallback category flowers:", err);
        setFilteredFlowers(FALLBACK_FLOWERS[activeCategory] || FALLBACK_FLOWERS["fresh-flowers"]);
        setLoadingFlowers(false);
      });
  }, [activeCategory, API_URL]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (collectionRef.current) {
      collectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectFlower = (flower) => {
    const itemToAdd = {
      _id: flower._id,
      id: flower._id,
      name: flower.name,
      price: flower.price,
      image: flower.image,
      imageUrl: flower.image.startsWith('http') ? flower.image : `${API_URL}${flower.image}`,
      quantity: 1,
    };
    
    const existingCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    const updatedCart = [...existingCart, itemToAdd];
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cart-updated"));
    
    navigate("/checkout");
  };

  const activeCategoryObj = CATEGORIES.find(c => c.id === activeCategory) || CATEGORIES[0];

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Immersive Hero Section */}
      <section className="hero-wrap">
        <div className="hero-content">
          <span className="hero-badge">Vista Luxe Bouquets®</span>
          <h1 className="title-display">
            Art of <br /><span className="text-gold">Gifting</span>
          </h1>
          <p>
            Experience the unmatched elegance of our uniquely crafted floral arrangements, curated from the world's finest seasonal blooms and delivered with boutique care.
          </p>
          <div className="action-row" style={{ maxWidth: '400px' }}>
            <button className="btn-luxury" onClick={() => handleCategoryClick("fresh-flowers")}>
              <span>Shop Collection</span>
            </button>
            <button className="btn-luxury btn-outline" onClick={() => navigate("/about")}>
              <span>Our Story</span>
            </button>
          </div>
        </div>

        <div className="hero-images">
          <div className="hero-img-box">
            <OptimizedImage src={images.heroImage} alt="Luxury Floral Arrangement" />
          </div>
          <div className="hero-img-box">
            <OptimizedImage src={images["fresh-flowers"]} alt="Fresh Bloom Detail" />
          </div>
        </div>
      </section>

      {/* Redesigned "Curated for You" Editorial Section */}
      <section className="section-padding container" id="curated-section">
        <div className="editorial-header">
          <span className="subtitle">Signature Collections</span>
          <h2>Curated For You</h2>
          <p>
            Thoughtfully chosen flowers, live greenery, and sensory essentials for every memorable occasion. Over 40 unique designs available across our 4 boutique collections.
          </p>
        </div>

        {/* Asymmetric 4-Category Editorial Grid */}
        <div className="curated-editorial-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className={`cat-editorial-card ${cat.colClass} ${activeCategory === cat.id ? 'active-selected' : ''}`}
              onClick={() => handleCategoryClick(cat.id)}
            >
              <img
                src={images[cat.id] || cat.defaultImg}
                alt={cat.title}
                className="cat-editorial-bg"
              />
              <div className="cat-editorial-overlay" />
              <div className="cat-editorial-content">
                <span className="cat-editorial-tag">{cat.subtitle}</span>
                <h3 className="cat-editorial-title">{cat.title}</h3>
                <p className="cat-editorial-desc">{cat.description}</p>
                <div className="cat-editorial-cta">
                  <span>Explore Collection (10+ Available)</span>
                  <FaArrowRight />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Category Flowers Collection Showcase */}
        <div ref={collectionRef} style={{ paddingTop: '20px' }}>
          {/* Category Switcher Tabs */}
          <div className="category-filter-tabs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`tab-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Active Category Header Banner */}
          <div className="category-view-banner">
            <div className="category-view-info">
              <h3>{activeCategoryObj.title}</h3>
              <p>{activeCategoryObj.description}</p>
            </div>
            <div className="category-view-count">
              {filteredFlowers.length} Designs Available (Prices in USD $)
            </div>
          </div>

          {/* Flowers Results Grid */}
          <div className="product-grid" style={{ marginBottom: '80px' }}>
            {loadingFlowers ? (
              Array(10).fill(0).map((_, i) => (
                <div key={i} style={{ border: 'none' }}>
                  <div style={{ width: '100%', height: '320px', background: '#EAEAEA', borderRadius: '4px' }} />
                  <div style={{ marginTop: '15px', textAlign: 'center' }}>
                    <div style={{ width: '60%', height: '20px', background: '#EAEAEA', margin: '0 auto 8px' }} />
                    <div style={{ width: '30%', height: '16px', background: '#EAEAEA', margin: '0 auto' }} />
                  </div>
                </div>
              ))
            ) : filteredFlowers.length > 0 ? (
              filteredFlowers.map((flower) => (
                <div key={flower._id} className="prod-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <Link to={`/product/${flower._id}`} className="prod-img-wrap" style={{ textDecoration: 'none' }}>
                    <OptimizedImage
                      src={flower.image.startsWith('http') ? flower.image : `${API_URL}${flower.image}`}
                      alt={flower.name}
                      aspectRatio="4/5"
                      className="prod-img"
                    />
                    <span className="prod-badge">{activeCategoryObj.title.split(' ')[0]}</span>
                    <div className="prod-action">Quick View</div>
                  </Link>

                  <div className="prod-info" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 className="prod-title" style={{ fontSize: '1.15rem', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>
                        {flower.name}
                      </h3>
                      {/* Price displayed in USD ($) directly under image */}
                      <p className="prod-price-dollar" style={{ margin: '8px 0 16px 0', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)', fontFamily: 'var(--font-sans)' }}>
                        {formatDollar(flower.price)}
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                      <button
                        className="btn-luxury"
                        style={{ flex: 1, padding: '12px 14px', fontSize: '0.75rem' }}
                        onClick={() => handleSelectFlower(flower)}
                      >
                        <span>Select Flower</span>
                      </button>
                      <Link
                        to={`/product/${flower._id}`}
                        className="btn-luxury btn-outline"
                        style={{ padding: '12px 14px', fontSize: '0.75rem', textDecoration: 'none' }}
                      >
                        <span>View</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : null}
          </div>
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
          <button className="btn-luxury" onClick={() => navigate("/about")} style={{ alignSelf: 'flex-start' }}>
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
            <p>Industry-leading encryption ensures your personal data and payments are protected.</p>
          </div>
          <div className="feature-box">
            <FaStar className="feature-icon" />
            <h3>Premium Quality</h3>
            <p>Only the freshest, hand-selected blooms make it into our signature arrangements.</p>
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
        <OptimizedImage src={images["live-plants"]} alt="Subscriptions" className="split-img" />
      </section>

      {/* Reviews */}
      <div style={{ padding: '80px 0', background: 'var(--color-bg-secondary)' }}>
        <Review />
      </div>
    </div>
  );
};

export default Home;
