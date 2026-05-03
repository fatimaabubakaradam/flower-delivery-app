import React, { useState, useEffect } from "react";
import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import OptimizedImage from "./components/OptimizedImage";
import { PerformanceManager } from "./utils/PerformanceManager";
import Review from "./review";

// Assets
import human from "./assets/human.png";
import wedding from "./assets/wedding.png"
import Contact from "./assets/contact.png"
import google from "./assets/google logo.png";
import "./App.css";

const Home = () => {
  const [images, setImages] = useState({
    heroImage: "",
    freshFlowers: "",
    driedFlowers: "",
    livePlants: "",
    aromaCandles: "",
    fresheners: "",
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
            if (key === 'heroImage') urlsToPreload.push(url);
          }
        }

        setImages(updatedImages);
        PerformanceManager.preloadImages(urlsToPreload);
      })
      .catch(err => console.error("Error fetching flower images:", err));
  }, [API_URL]);

  const handleLearnMoreClick = () => navigate("/about");

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div className="home-container">
        <section className="hero">
          <div className="hero-text-content">
            <h1>Kyiv <br /><strong>LuxeBouquets®</strong></h1>
            <p>
              Experience the art of gifting with our uniquely crafted bouquets 
              and premium floral arrangements, delivered with care in Kyiv.
            </p>
            <button className="btn-luxe" onClick={handleLearnMoreClick}>
              EXPLORE OUR STORY
            </button> 
          </div>
          <div className="hero-visual">
            <OptimizedImage 
              src={images.heroImage} 
              alt="Kyiv LuxeBouquets Hero" 
              aspectRatio="4/5"
              className="hero-img"
            />
          </div>
        </section>
      </div>

      {/* Categories Grid */}
      <section className="categories">
        <div className="category">
          <h2>Fresh Flowers</h2>
          <Link to="/Category" className="shop-cat">Shop now →</Link>
          <img src={images.freshFlowers} alt="Fresh Flowers" />
        </div>
        <div className="category">
          <img src={images.driedFlowers} alt="Dried Flowers" />
          <h2>Dried Flowers</h2>
          <Link to="/Category1" className="shop-cat">Shop now →</Link> 
        </div>
        <div className="category">
          <h2>Live Plants</h2>
          <Link to="/Category2" className="shop-cat">Shop now →</Link> 
          <img src={images.livePlants} alt="Live Plants" />
        </div>
        <div className="category">
          <img src={images.aromaCandles} alt="Aroma Candles" />
          <h2>Aroma Candles</h2>
          <Link to="/Category3" className="shop-cat">Shop now →</Link> 
        </div>
      </section>

      {/* About Section */}
      <div className="home-container">
        <section className="about">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}>
            <div className="about-visual">
              <OptimizedImage src={human} alt="LuxeBouquets Studio" aspectRatio="1/1" />
            </div>
            <div className="about-content">
              <span className="about-label">Since 2012</span>
              <h2>About us</h2>
              <p style={{ marginBottom: '32px', fontSize: '1.125rem' }}>
                We are a modern local floral studio specializing in the design and delivery of unique bouquets. 
                Our florists hand-pick each bloom from direct partnerships with leading farms.
              </p>
              <button className="btn-luxe btn-outline" onClick={handleLearnMoreClick}>
                LEARN MORE
              </button> 
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="why-choose-us" style={{ padding: '100px 0' }}>
          <h2 style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '80px' }}>Why choose us?</h2>
          <div className="why-choose-us-grid">
            {[
              { title: "Artisan Floristry", text: "Each arrangement is a unique masterpiece crafted by our award-winning designers." },
              { title: "Punctual Delivery", text: "Real-time tracking and precise delivery windows for every single order." },
              { title: "Safe & Secure", text: "Industry-leading encryption ensures your personal and payment data is always protected." },
              { title: "Premium Subscriptions", text: "Tailored flower schedules that save you up to 30% on your recurring orders." }
            ].map((item, idx) => (
              <div key={idx} className="service-card">
                <h3 style={{ marginBottom: '20px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="img-contact-card">
          <div className="contact-image">
            <OptimizedImage src={Contact} alt="Contact Us" aspectRatio="1/1" />
          </div>
          <div className="contact-form-container">
            <span className="about-label">Get in Touch</span>
            <h2>Book a Consultation</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '48px' }}>
              Have questions or need a custom arrangement? Leave your contact details below.
            </p>
            <input type="text" placeholder="+380 XX XXX XX XX" />
            <button className="btn-luxe">REQUEST A CALL</button>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '60px' }}>
              <div>
                <p className="footer-label">Phone</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaPhone style={{ color: 'var(--color-gold)' }} />
                  <span style={{ fontWeight: 600 }}>+380 98 009 9777</span>
                </div>
              </div>
              <div>
                <p className="footer-label">Location</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FaMapMarkerAlt style={{ color: 'var(--color-gold)' }} />
                  <span style={{ fontWeight: 600 }}>15/4 Khreshchatyk, Kyiv</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Subscription Section */}
      <section style={{ background: 'var(--color-charcoal)', padding: '120px 0', color: 'white', textAlign: 'center', marginTop: '140px' }}>
        <div className="home-container">
          <span className="about-label" style={{ color: 'var(--color-gold-light)' }}>Our Services</span>
          <h2 style={{ fontSize: '4rem', margin: '24px 0 32px' }}>Flower Subscriptions</h2>
          <p style={{ maxWidth: '700px', margin: '0 auto 48px', opacity: 0.8, fontSize: '1.25rem' }}>
            Transform your space weekly with our curated floral designs. 
            Flexible plans that bring nature's beauty to your door.
          </p>
          <button className="btn-luxe" style={{ background: 'var(--color-gold)', borderColor: 'var(--color-gold)' }}>
            SUBSCRIBE NOW
          </button>
        </div>
      </section>

      {/* Social Proof */}
      <div className="home-container">
        <section style={{ padding: '140px 0', textAlign: 'center' }}>
          <img src={google} alt="Reviews" style={{ height: '60px', marginBottom: '32px' }} />
          <span className="about-label">Client Stories</span>
          <h2 style={{ fontSize: '3rem', margin: '24px 0 48px' }}>Our clients say</h2>
          <blockquote style={{ fontSize: '1.5rem', fontStyle: 'italic', maxWidth: '900px', margin: '0 auto 48px' }}>
            "The most exquisite floral experience I've ever had. Their attention to detail and choice of blooms is unparalleled in Kyiv."
          </blockquote>
          <cite style={{ fontWeight: 700, fontSize: '1.125rem', display: 'block', marginBottom: '48px' }}>— Ronald Richards</cite>
          <button className="btn-luxe btn-outline">READ MORE REVIEWS</button>
        </section>
      </div>

      <Review /> 
    </div>
  );
};

export default Home;
