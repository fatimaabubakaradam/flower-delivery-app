import React, { useState, useEffect } from 'react';
import Skeleton from './Skeleton';

/**
 * OptimizedImage Component
 * Handles lazy loading, skeletons, and smooth fade-in animations.
 */
const OptimizedImage = ({ src, alt, className = '', containerClassName = '', aspectRatio = '4/5', ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;
    
    const img = new Image();
    img.src = src;
    img.onload = () => setLoaded(true);
    img.onerror = () => {
      setLoaded(true);
      setError(true);
    };
  }, [src]);

  const placeholder = 'https://via.placeholder.com/600x800?text=Luxe+Bouquet';

  return (
    <div 
      className={`image-container ${containerClassName}`} 
      style={{ 
        position: 'relative', 
        width: '100%', 
        aspectRatio: aspectRatio,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9'
      }}
    >
      {!loaded && <Skeleton height="100%" />}
      <img
        src={error ? placeholder : src}
        alt={alt}
        className={`${className} ${loaded ? 'fade-in' : 'hidden'}`}
        style={{
          opacity: loaded ? 1 : 0,
          transition: 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          display: loaded ? 'block' : 'none'
        }}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
