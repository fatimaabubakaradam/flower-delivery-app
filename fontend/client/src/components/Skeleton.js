import React from 'react';

const Skeleton = ({ width, height, borderRadius = '0px', className = '' }) => {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || '100%', 
        borderRadius,
        minHeight: height || '100px'
      }} 
    />
  );
};

export default Skeleton;
