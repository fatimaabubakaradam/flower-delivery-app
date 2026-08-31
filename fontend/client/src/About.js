import React from "react";
import { FaInstagram, FaPinterest, FaFacebookF, FaTwitter, FaTelegramPlane } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 
import "./App.css";  
import flowerlady from "./assets/lady.png"; 
import flowerladys from "./assets/sec-story.png"; 
import flowerladyss from "./assets/parlour.png"; 
import flowerladysy from "./assets/pinkflower.png"; 
import Review from "./review";

const OurStory = () => {
  const navigate = useNavigate(); 

  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)' }}>
      {/* Editorial Header */}
      <section className="section-padding container" style={{ paddingTop: '160px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <span className="hero-badge">The Studio</span>
            <h1 className="title-display" style={{ fontSize: '4rem', margin: '20px 0' }}>Our Story</h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.6, marginBottom: '40px' }}>
              Discover Uniquely Crafted Bouquets and Gifts for Any Occasion: Spread Joy with Our Online Flower Delivery Service.
            </p>
            <div className="social-icons" style={{ display: 'flex', gap: '20px' }}>
              <a href="#" className="action-icon"><FaInstagram /></a>
              <a href="#" className="action-icon"><FaPinterest /></a>
              <a href="#" className="action-icon"><FaFacebookF /></a>
              <a href="#" className="action-icon"><FaTwitter /></a>
              <a href="#" className="action-icon"><FaTelegramPlane /></a>
            </div>
          </div>
          <div className="hero-img-box" style={{ borderRadius: '4px' }}>
            <img src={flowerlady} alt="Studio Life" />
          </div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="split-section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="split-content" style={{ padding: '10% 10%' }}>
          <span className="hero-badge">Est. 2010</span>
          <h2>The Founder's Vision</h2>
          <p>
            Kyiv LuxeBouquets was founded in 2010 by Natalia Zelinska with the goal of bringing unique and exquisite bouquets to the people of Kyiv. What started as a small boutique has grown into Kyiv's premier destination for luxury floral design.
          </p>
        </div>
        <img src={flowerladys} alt="Natalia Zelinska" className="split-img" />
      </section>

      {/* Grid of Passion */}
      <section className="section-padding container">
        <div className="cat-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '60px' }}>
          <div>
            <div className="hero-img-box" style={{ borderRadius: '4px', marginBottom: '30px', height: '400px' }}>
              <img src={flowerladyss} alt="The Parlour" />
            </div>
            <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Artisanal Excellence</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>
              At Kyiv LuxeBouquets, we take pride in our team of talented and experienced florists who carefully select each bloom, ensuring that only the freshest and most stunning flowers make it into our bouquets.
            </p>
          </div>
          <div>
            <div className="hero-img-box" style={{ borderRadius: '4px', marginBottom: '30px', height: '400px' }}>
              <img src={flowerladysy} alt="Signature Blooms" />
            </div>
            <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>Beyond Bouquets</h3>
            <p style={{ color: 'var(--color-text-muted)' }}>
              In addition to our stunning bouquets, we also offer a collection of dried bouquets, house plants, and fragrant candles from luxury brands to create the perfect ambiance in any space.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section-padding" style={{ background: 'var(--color-dark)', color: '#fff', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ color: '#fff', fontSize: '3rem', marginBottom: '20px' }}>Discover Our Collection</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto 40px' }}>
            Explore our curated gallery of exquisite bouquets and surprise your loved ones with the perfect gift today.
          </p>
          <button onClick={() => navigate('/product')} className="btn-luxury" style={{ background: 'var(--color-accent-gold)', borderColor: 'var(--color-accent-gold)' }}>
            <span>Shop Now</span>
          </button>
        </div>
      </section>

      <div style={{ padding: '80px 0', background: 'var(--color-bg-secondary)' }}>
        <Review /> 
      </div>
    </div>
  );
};

export default OurStory;
