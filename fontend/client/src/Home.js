import React, { useState, useEffect } from "react";
import "./App.css"; // Import styles
import Image from "./assets/flower.png";
import human from "./assets/human.png";
import wedding from "./assets/wedding.png"
import { FaPhone } from "react-icons/fa";
import google from "./assets/google logo.png";
import { Link } from "react-router-dom";
import {  FaMapMarkerAlt } from "react-icons/fa";
import Category from "./Category";



import Review from "./review";


const Home = () => {  // Define the functional component
  const [images, setImages] = useState({
    heroImage: "",
    freshFlowers: "",
    driedFlowers: "",
    livePlants: "",
    aromaCandles: "",
    fresheners: "",
  });

  useEffect(() => {
    // Function to fetch a single image by ID
    const fetchImage = async (id, key) => {
      try {
        const response = await fetch(`http://localhost:3000/api/flowers/${id}`);
        const data = await response.json();
        setImages((prevImages) => ({
          ...prevImages,
          [key]: `http://localhost:3000${data.image}`,
        }));
      } catch (error) {
        console.error(`Error fetching ${key} image:`, error);
      }
    };

    // Fetch images separately by their unique IDs
    fetchImage("67e32f83e29686944d247fe7", "heroImage"); // Hero Image
    fetchImage("67e3341ee29686944d248000", "freshFlowers"); // Fresh Flowers Image
    fetchImage("67e3344fe29686944d248002", "driedFlowers"); // Dried Flowers Image
    fetchImage("67e33d79e29686944d248038", "livePlants"); 
    fetchImage("67e33db7e29686944d24803a", "aromaCandles"); 
    fetchImage("67e33e00e29686944d24803c", "fresheners"); 
  }, []);

  return (
    <div className="home-container">
      <div className="container-of-desk">
              {/* Hero Section */}
      <section className="hero">
        <h1>Kyiv <br /><strong>LuxeBouquets®</strong></h1>
        <p>
          Discover Uniquely Crafted Bouquets and Gifts for Any Occasion. 
          Spread Joy with Our <i>Online Flower Delivery Service</i>
        </p>
        <div className="hero-content">
          <img src={images.heroImage} alt="Woman with flowers" className="hero-img" />
          <p className="hero-text">
            Experience the joy of giving with our modern floral studio. Order online 
            and send fresh flowers, plants, and gifts today.
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
  {/* First row: Fresh Flowers (Text) + Dried Flowers (Image) */}
  <div className="category">
  <p>Fresh Flowers</p>
  <Link to="/Category">Shop now →</Link> {/* ✅ Correct path */}
</div>
<div className="category">
  <img src={images.freshFlowers} alt="Fresh Flowers" />
</div>

  {/* Second row: Live Plants (Image) + Aroma Candles (Text) */}
  <div className="category">
    <img src={images.driedFlowers} alt="Dried Flowers" />
  </div>
  <div className="category">
    <p>Dried Flowers</p>
    <Link to="/Category">Shop now →</Link> {/* ✅ Correct path */}
    </div>

</section>
      </div>
      <div className="container-of-desk-2">
        <section className="empty-card"></section>
      <section className="categories">
         
         {/* Third row: Live Plants (Text) + Aroma Candles (Image) */}
         <div className="category">
           <p>Live Plants</p>
           <Link to="/Category">Shop now →</Link> {/* ✅ Correct path */}

         </div>
         <div className="category">
           <img src={images.livePlants} alt="Live Plants" />
         </div>
       
         {/* Fourth row: Aroma Candles (Image) + Fresheners (Text) */}
         <div className="category">
           <img src={images.aromaCandles} alt="Aroma Candles" />
         </div>
         <div className="category">
           <p>Aroma Candles</p>
           <Link to="/Category">Shop now →</Link> {/* ✅ Correct path */}

         </div>
            </section>
      </div>
     
<div className="about">
      <section className="about-header">
        <h1>About us</h1>
      </section>

      <section className="about-content">
        <p className="story-title">OUR STORY</p>
        <h3>Kyiv LuxeBouquets</h3>
        <p>
          We are a modern local floral studio, which specializes in the design
          and delivery of unique bouquets. We have the best florists who
          carefully select each look. Our studio cooperates directly with farms
          for growing different flowers, so we always have fresh flowers...
        </p>
        <div className="learn-more">
        <button>LEARN MORE</button>
      </div>
      </section>
    </div>
    <div className="why-choose-us">
      

      <section className="title">
        <h2>Why choose us ?</h2>
      </section>
      <section className="service-info">
    <div className="content">
        <h3>Stylish bouquets by florists</h3>
        <p>
          At our floral studio, our professional florists craft the most elegant and stylish bouquets 
          using only the freshest and highest quality materials available. We stay up-to-date with the 
          latest floral design trends and offer unique arrangements that are sure to impress. Let us 
          brighten up your day with our stunning bouquets and same-day delivery service.
        </p>
      </div>
      <div className="service">
        <h3>On-time delivery</h3>
        <p>
          Never miss a moment with our on-time flower delivery service. 
          Our couriers will deliver your bouquet personally, without boxes, 
          to ensure it arrives in perfect condition. Trust us to deliver 
          your thoughtful gift reliably.
        </p>
      </div>

      <div className="service">
        <h3>Safe payment</h3>
        <p>
          You can feel secure when placing an order with us, as we use 
          industry-standard security measures to protect your payment 
          information. Your transaction will be safe and hassle-free, 
          so you can shop with confidence.
        </p>
      </div>
      <div className="service">
        <h3>Subscription by your needs</h3>
        <p>
          With our subscription service tailored to your specific needs, 
          you can enjoy the convenience of having beautiful bouquets 
          delivered straight to your door at regular intervals. Our flexible 
          service is perfect for busy individuals or those who want to ensure 
          they always have fresh flowers on hand. You'll save time and money 
          with this hassle-free solution to your floral needs.
        </p>
      </div>
    </section>
     
    </div>
   <div className="img-contact-card">
   <section className="image-section">
  <img src={Image} alt="Beautiful flower" className="custom-img" />
</section>
<section className="contact-section">
  {/* Contact Form */}
  <div className="contact">
    <h2>To Contact Us</h2>
    <p>We will call you back</p>
    <input type="text" placeholder="+380 XX XXX XX XX" />
    <button>BOOK A CALL</button>
  </div>

  {/* Phone & Address Section in a Grid */}
  <div className="contact-details">
    {/* Phone Section */}
    <div className="contact-item">
      <h3>Phone</h3>
      <div className="phone">
        <FaPhone className="icon" />
        <span>+380980099777</span>
      </div>
      <div className="phone">
        <FaPhone className="icon" />
        <span>+380980099111</span>
      </div>
    </div>

    {/* Address Section */}
    <div className="contact-item">
      <h3>Address</h3>
      <p>OPENING HOURS: 8 TO 11 P.M.</p>
      <p><FaMapMarkerAlt className="icon" /> 15/4 Khreshchatyk Street, Kyiv</p>
    </div>
  </div>
</section>

   </div>
    
    <section className="section-container">
    <h1 className="service-title">Our Service</h1>

    </section>
    <div className="container-desk-under">
       
      <section className="image-section">
      <img src={human} alt="Woman with flowers" className="custom-img" />

      </section>
      
      <section className="subscription-card">
      <p className="service-text">SERVICE</p>
      <h2 className="title">Flower Subscriptions</h2>
      <p className="description">
        Experience the convenience and savings of regular flower deliveries
        with our flexible subscription service – up to 30% more profitable than
        one-time purchases.
      </p>
      <button className="subscribe-btn">SUBSCRIBE NOW</button>
    </section>
    </div>
    <section className="image-section-1">
  <img src={wedding} alt="Beautiful flower" className="custom-img-1" />
</section>
<div className="reviews-card">
      <img src={google} alt="Google Logo" className="google-logo" />
      <p className="reviews-title">REVIEWS</p>
      <h2 className="client-title">Our Clients say</h2>
      <p className="review-text">
        “Ordered flowers online and they were the best bouquet! Impressed
        everyone around. Highly recommend this flower shop!”
      </p>
      <p className="review-author">– Ronald Richards</p>
      <div className="dots">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <button className="read-btn">READ REVIEWS</button>
    </div>
          <Review /> 

    </div>
  );
};

export default Home;
