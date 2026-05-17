import React from "react";
import { FaInstagram, FaPinterest, FaFacebook, FaTwitter, FaTelegram, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import "./App.css";

const ContactUs = () => {
  return (
    <div style={{ backgroundColor: 'var(--color-bg-primary)', minHeight: '100vh', paddingTop: '160px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px' }}>
          <div>
            <span className="hero-badge">Get in Touch</span>
            <h1 className="title-display" style={{ fontSize: '4rem', margin: '20px 0' }}>Contact Us</h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: '60px', lineHeight: 1.6 }}>
              Whether you have a question about a bespoke arrangement or need assistance with an order, our concierge team is here to help.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <FaMapMarkerAlt style={{ color: 'var(--color-accent-gold)', fontSize: '1.5rem', marginTop: '5px' }} />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Atelier Address</h4>
                  <p style={{ fontSize: '1.1rem' }}>15/4 Khreshchatyk Street, Kyiv, Ukraine</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <FaPhone style={{ color: 'var(--color-accent-gold)', fontSize: '1.5rem', marginTop: '5px' }} />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Phone Concierge</h4>
                  <p style={{ fontSize: '1.1rem' }}>+380 98 009 9777</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                <FaEnvelope style={{ color: 'var(--color-accent-gold)', fontSize: '1.5rem', marginTop: '5px' }} />
                <div>
                  <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>General Enquiries</h4>
                  <p style={{ fontSize: '1.1rem' }}>Kiev.Florist.Studio@gmail.com</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '60px' }}>
              <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '20px' }}>Follow Our Journey</h4>
              <div style={{ display: 'flex', gap: '25px', fontSize: '1.5rem' }}>
                <a href="#" className="action-icon"><FaInstagram /></a>
                <a href="#" className="action-icon"><FaPinterest /></a>
                <a href="#" className="action-icon"><FaFacebook /></a>
                <a href="#" className="action-icon"><FaTwitter /></a>
                <a href="#" className="action-icon"><FaTelegram /></a>
              </div>
            </div>
          </div>

          <div style={{ 
            background: 'var(--color-bg-secondary)', padding: '60px', 
            borderRadius: '4px', alignSelf: 'start', border: 'var(--border-delicate)'
          }}>
            <h3 style={{ fontSize: '2rem', marginBottom: '30px' }}>Send a Message</h3>
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" className="luxury-input" placeholder="Full Name" style={{ borderBottomColor: 'rgba(0,0,0,0.1)', color: 'var(--color-dark)' }} />
              <input type="email" className="luxury-input" placeholder="Email Address" style={{ borderBottomColor: 'rgba(0,0,0,0.1)', color: 'var(--color-dark)' }} />
              <textarea className="luxury-input" placeholder="Your Message" style={{ borderBottomColor: 'rgba(0,0,0,0.1)', color: 'var(--color-dark)', height: '120px', resize: 'none' }} />
              <button className="btn-luxury" style={{ width: '100%', marginTop: '20px' }}>
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
