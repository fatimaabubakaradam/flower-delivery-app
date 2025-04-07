import React from "react";
import { FaInstagram, FaPinterest, FaFacebookF, FaTwitter, FaTelegramPlane } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom"; 
import "./about.css";  
import flowerlady from "./assets/lady.png"; 
import flowerladys from "./assets/sec-story.png"; 
import flowerladyss from "./assets/parlour.png"; 
import flowerladysy from "./assets/pinkflower.png"; 
import Review from "./review";


const OurStory = () => {
  const navigate = useNavigate(); 

  const handleLearnMoreClick = () => {
    navigate('/product'); 
  };

  return (
  
    <div className="our-story">
      <div className="con-gr-about">
      <section>
      <h2 className="our-story-title">Our Story</h2>
      <h3 className="about-title">About</h3>
      <h1 className="brand-name">Kyiv LuxeBouquets</h1>
      <p className="description">
        Discover Uniquely Crafted Bouquets and Gifts for Any Occasion: Spread Joy with Our
        Online Flower Delivery Service
      </p>
      <div className="social-icons">
        <a href="#" className="social-icon instagram"><FaInstagram size={30} /></a>
        <a href="#" className="social-icon pinterest"><FaPinterest size={30} /></a>
        <a href="#" className="social-icon facebook"><FaFacebookF size={30} /></a>
        <a href="#" className="social-icon twitter"><FaTwitter size={30} /></a>
        <a href="#" className="social-icon telegram"><FaTelegramPlane size={30} /></a>
      </div>
      </section>
      
    
      <section className="about-image-container">
         <img src={flowerlady} alt="Beautiful Flower Arrangement" className="about-image" />
      </section>
      </div>
     
      <div className="founders-passion">
        <h2 className="section-title">Our Story</h2>
        <h3 className="passion-title">Our Founder's Passion</h3>
        <p className="passion-description">
          Kyiv LuxeBouquets was founded in 2010 by Natalia Zelinska with the goal of bringing unique and exquisite bouquets to the people of Kyiv.
        </p>
      </div>
      <div className="carfted-con-gr">
      <section className="about-image-container-1">
         <img src={flowerladys} alt="Beautiful Flower Arrangement" className="about-image-1" />
      </section>
      <section className="bouquet-container">
        <div className="bouquet-content">
          <h2>Expertly Crafted Bouquets</h2>
          <p>
            At Kyiv LuxeBouquets, we take pride in our team of talented and experienced 
            florists who carefully select each bloom, ensuring that only the freshest 
            and most stunning flowers make it into our bouquets.
          </p>
        </div>
      </section>
      <section className="parlour-image-container">
         <img src={flowerladyss} alt="Beautiful Flower Arrangement" className="parlour-image" />
      </section>
      <section className="bouquet-info-container">
        <div className="bouquet-info-content">
          <h2>Bouquets, Gifts & Ambiance</h2>
          <p>
            In addition to our stunning bouquets, we also offer a collection of dried bouquets, 
            house plants, and fragrant candles from luxury brands to create the perfect ambiance.
          </p>
        </div>
      </section>
      <section className="pink-image-container">
         <img src={flowerladysy} alt="Beautiful Flower Arrangement" className="pink-image" />
      </section>
      <section className="bouquet-info-container">
        <div className="bouquet-info-content">
          <h2>Making Every Day Special</h2>
          <p>
            Our mission is simple, to make everyday special and memorable for the customer. 
            We believe that sending flowers, plants, and gifts should be easy and stress-free.
          </p>
        </div>
      </section>
        </div>
     
      <div className="bouquet-info-container-1">
        <div className="bouquet-info-content">
          <h2>Discover Our</h2>
          <h2>Beautiful Bouquets</h2>
          <p>
            Explore our collection of exquisite bouquets and surprise your loved ones with the perfect gift.
          </p>
          <button onClick={handleLearnMoreClick} className="shop-abt-btn">Shop</button>
        </div>
      </div>
      <Review /> 

    </div>
  );
};

export default OurStory;
