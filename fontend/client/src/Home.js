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
    <div className="home-container fade-in">
      <section className="hero">
        <div className="hero-text-content">
          <h1>Kyiv <br /><strong>LuxeBouquets®</strong></h1>
          <p>
            Discover uniquely crafted bouquets and premium gifts for any occasion. 
            Experience the art of floral design with our online delivery service.
          </p>
          <div className="learn-more">
            <button onClick={handleLearnMoreClick}>EXPLORE OUR STORY</button> 
          </div>
        </div>
        <div className="hero-visual">
          <OptimizedImage 
            src={images.heroImage} 
            alt="Woman with Luxe Bouquets" 
            aspectRatio="4/5"
            className="hero-img"
          />
        </div>
      </section>

      <section className="categories">
        <div className="category">
          <div style={{ padding: '40px' }}>
            <h2>Fresh Flowers</h2>
            <Link to="/Category" className="shop-cat">Shop the collection →</Link>
          </div>
        </div>
        <div className="category">
          <OptimizedImage src={images.freshFlowers} alt="Fresh Flowers" aspectRatio="1/1" />
        </div>

        <div className="category">
          <OptimizedImage src={images.driedFlowers} alt="Dried Flowers" aspectRatio="1/1" />
        </div>
        <div className="category">
          <div style={{ padding: '40px' }}>
            <h2>Dried Flowers</h2>
            <Link to="/Category1" className="shop-cat">Shop the collection →</Link> 
          </div>
        </div>

        <div className="category">
          <div style={{ padding: '40px' }}>
            <h2>Live Plants</h2>
            <Link to="/Category2" className="shop-cat">Shop the collection →</Link> 
          </div>
        </div>
        <div className="category">
          <OptimizedImage src={images.livePlants} alt="Live Plants" aspectRatio="1/1" />
        </div>

        <div className="category">
          <OptimizedImage src={images.aromaCandles} alt="Aroma Candles" aspectRatio="1/1" />
        </div>
        <div className="category">
          <div style={{ padding: '40px' }}>
            <h2>Aroma Candles</h2>
            <Link to="/Category3" className="shop-cat">Shop the collection →</Link> 
          </div>
        </div>
      </section>

      <section className="about" style={{ padding: '100px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '3rem', marginBottom: '40px' }}>About us</h2>
            <p style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--gold)', marginBottom: '16px' }}>Our Story</p>
            <h3 style={{ marginBottom: '24px' }}>Kyiv LuxeBouquets</h3>
            <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '40px' }}>
              We are a modern local floral studio specializing in the design and delivery of unique bouquets. 
            </p>
            <div className="learn-more">
              <button onClick={handleLearnMoreClick}>LEARN MORE</button> 
            </div>
          </div>
          <div>
            <OptimizedImage src={human} alt="Floral Studio" aspectRatio="1/1" />
          </div>
        </div>
      </section>

      <section className="why-choose-us" style={{ padding: '100px 0', borderTop: '1px solid var(--medium-gray)' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '60px', textAlign: 'center' }}>Why choose us?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px' }}>
          {[
            { title: "Stylish bouquets by florists", text: "Our professional florists craft elegant arrangements using the highest quality materials." },
            { title: "On-time delivery", text: "Personally delivered without boxes, ensuring your gift arrives in perfect condition." },
            { title: "Safe payment", text: "Secure industry-standard measures protect your transaction." },
            { title: "Subscription tailored to you", text: "Save up to 30% with regular deliveries of fresh flowers." }
          ].map((item, idx) => (
            <div key={idx} style={{ padding: '40px', background: 'white', border: '1px solid var(--medium-gray)' }}>
              <h3 style={{ marginBottom: '16px' }}>{item.title}</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="img-contact-card" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid var(--charcoal)', marginTop: '60px' }}>
        <div style={{ borderRight: '1px solid var(--charcoal)' }}>
          <OptimizedImage src={Contact} alt="Contact" aspectRatio="1/1" />
        </div>
        <div style={{ padding: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>To Contact Us</h2>
          <p style={{ marginBottom: '40px', color: 'var(--text-secondary)' }}>We will call you back</p>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '60px' }}>
            <input type="text" placeholder="+380 XX XXX XX XX" style={{ flex: 1, padding: '12px', border: '1px solid var(--medium-gray)' }} />
            <button className="add-to-basket" style={{ width: 'auto', padding: '0 40px' }}>BOOK A CALL</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Phone</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <FaPhone style={{ color: 'var(--gold)' }} /> <span>+380980099777</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaPhone style={{ color: 'var(--gold)' }} /> <span>+380980099111</span>
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>Address</h3>
              <p style={{ fontSize: '0.875rem' }}><FaMapMarkerAlt /> 15/4 Khreshchatyk Street, Kyiv</p>
            </div>
          </div>
        </div>
      </section>

      <Review /> 
    </div>
  );
};

export default Home;
