import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";
import Skeleton from "./components/Skeleton";
import Review from "./review";
import { formatDollar } from "./utils/currency";

import Fresh from "./assets/fresh.png";
import Dry from "./assets/dry.png";
import Live from "./assets/live.png";
import Aroma from "./assets/aroma.png";
import "./App.css";

const CATEGORIES_LIST = [
  { id: "fresh-flowers", title: "Fresh Flowers" },
  { id: "dried-flowers", title: "Dried Flowers" },
  { id: "live-plants", title: "Live Plants" },
  { id: "aroma-candles", title: "Aroma Candles" },
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

const CategoryPage = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();

  const activeCategorySlug = categoryName || "fresh-flowers";
  const [flowers, setFlowers] = useState(FALLBACK_FLOWERS[activeCategorySlug] || FALLBACK_FLOWERS["fresh-flowers"]);
  const [loading, setLoading] = useState(false);

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

  const currentMeta = categoryMeta[activeCategorySlug] || { 
    title: "Our Collection", 
    image: Fresh, 
    fallback: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200",
    desc: "Explore our masterfully curated selection of boutique floral arrangements and lifestyle gifts."
  };

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    setLoading(true);
    let url = `${API_URL}/api/flowers`;
    if (activeCategorySlug) {
      const backendCategory = activeCategorySlug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      url = `${API_URL}/api/flowers?category=${encodeURIComponent(backendCategory)}`;
    }

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length >= 10) {
          setFlowers(data);
        } else if (Array.isArray(data) && data.length > 0) {
          const fallback = FALLBACK_FLOWERS[activeCategorySlug] || [];
          const merged = [...data];
          fallback.forEach(item => {
            if (merged.length < 10) merged.push(item);
          });
          setFlowers(merged);
        } else {
          setFlowers(FALLBACK_FLOWERS[activeCategorySlug] || FALLBACK_FLOWERS["fresh-flowers"]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.warn("Using fallback category flowers:", error);
        setFlowers(FALLBACK_FLOWERS[activeCategorySlug] || FALLBACK_FLOWERS["fresh-flowers"]);
        setLoading(false);
      });
  }, [activeCategorySlug, API_URL]);

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

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Dynamic Category Hero */}
      <section className="shop-header" style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${currentMeta.image || currentMeta.fallback})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: '#ffffff',
        padding: '120px 20px 80px',
        textAlign: 'center'
      }}>
        <span className="subtitle" style={{ color: 'var(--color-accent-gold-light)', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Boutique Collection</span>
        <h1 className="title-display" style={{ color: '#ffffff', fontSize: '3rem', margin: '15px 0' }}>{currentMeta.title}</h1>
        <p style={{ color: 'rgba(255,255,255,0.85)', maxWidth: '650px', margin: '0 auto', fontSize: '1.1rem' }}>
          {currentMeta.desc}
        </p>
      </section>

      <section className="container" style={{ padding: '60px 0 100px' }}>
        {/* Interactive Category Switcher Tabs */}
        <div className="category-filter-tabs" style={{ marginBottom: '50px' }}>
          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat.id}
              className={`tab-btn ${activeCategorySlug === cat.id ? 'active' : ''}`}
              onClick={() => navigate(`/category/${cat.id}`)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {loading ? (
            Array(10).fill(0).map((_, i) => (
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
              <div key={flower._id} className="prod-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <Link to={`/product/${flower._id}`} className="prod-img-wrap" style={{ textDecoration: 'none' }}>
                  <OptimizedImage
                    src={flower.image.startsWith('http') ? flower.image : `${API_URL}${flower.image}`}
                    alt={flower.name}
                    aspectRatio="4/5"
                    className="prod-img"
                  />
                  <span className="prod-badge">{currentMeta.title.split(' ')[0]}</span>
                  <div className="prod-action">Quick View</div>
                </Link>
                <div className="prod-info" style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 className="prod-title" style={{ fontSize: '1.15rem', marginBottom: '6px', fontFamily: 'var(--font-serif)' }}>{flower.name}</h3>
                    {/* Price displayed in Dollars under each flower image */}
                    <p className="prod-price-dollar" style={{ margin: '8px 0 16px 0', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-dark)', fontFamily: 'var(--font-sans)' }}>
                      {formatDollar(flower.price)}
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '10px' }}>
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
      </section>

      <div style={{ padding: '80px 0', background: 'var(--color-bg-secondary)' }}>
        <Review />
      </div>
    </div>
  );
};

export default CategoryPage;
